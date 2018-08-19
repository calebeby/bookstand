import { watch, InputOptions, OutputOptions } from 'rollup'
import { join } from 'path'
import virtualResolver from './virtual/rollup-plugin-virtual-resolver'
import VirtualModuleProvider from './virtual/virtual-module-loader'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import copy from 'rollup-plugin-copy'
import postcss from 'rollup-plugin-better-postcss'
import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'

interface BaseRollupConfig extends InputOptions {
  output: OutputOptions
}

type RollupConfig = BaseRollupConfig

const virtualModuleLoader = new VirtualModuleProvider()

virtualModuleLoader.registerModule('virtual-module', '')

export const createRollupConfig = (
  dir: string,
  dev: boolean,
): RollupConfig => ({
  input: 'virtual-module',
  output: {
    file: join(dir, 'dist', 'bundle.js'),
    name: 'Bundle',
    format: 'iife',
    sourcemap: dev,
  },
  inlineDynamicImports: false,
  plugins: [
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx', '.css'],
    }),
    virtualResolver(virtualModuleLoader),
    postcss({
      sourcemap: dev,
      minify: !dev,
    }),
    babel(),
    commonjs({ include: 'node_modules/**' }),
    ...(dev
      ? []
      : [
          terser({
            compress: {
              passes: 3,
              unsafe: true,
              unsafe_comps: true,
              hoist_funs: true,
              unsafe_math: true,
            },
          }),
        ]),
    copy({
      'src/frontend/index.html': 'dist/index.html',
      'src/frontend/_redirects': 'dist/_redirects',
      verbose: true,
    }),
  ],
  watch: {
    chokidar: false,
  },
})

type RollupWatchEvent =
  | {
      code:
        | 'START' /** the watcher is (re)starting */
        | 'BUNDLE_START' /** building an individual bundle */
        | 'BUNDLE_END' /** finished building a bundle */
        | 'END' /** finished building all bundles */
    }
  | {
      code:
        | 'ERROR' /** encountered an error while bundling */
        | 'FATAL' /** encountered an unrecoverable error */
      error: Error
    }

const printImports = (ids: string[]) =>
  Array.from(new Set(ids))
    .map(id => `import ${moduleToVariable(id)} from '${id}'`)
    .join('\n')

export const generateModule = (patternGroups: PatternGroup[]): string => {
  const patternImports: string[] = []
  const rendererImports: string[] = []
  const printPattern = (pattern: Pattern) => {
    rendererImports.push(pattern.renderer)
    patternImports.push(pattern.file)
    return `{
      name: "${pattern.name}",
      renderer: ${moduleToVariable(pattern.renderer)},
      pattern: ${moduleToVariable(pattern.file)}
    }`
  }
  const printPatternGroup = (patternGroup: PatternGroup) => `{
    name: "${patternGroup.name}",
    patterns: [
      ${patternGroup.patterns.map(printPattern).join(',\n')}
    ]
  }`

  const printedPatternGroups = patternGroups.map(printPatternGroup).join(',')

  return `
${printImports(rendererImports)}
${printImports(patternImports)}
import bookstand from '${join(__dirname, '..', 'src', 'frontend')}'

bookstand([${printedPatternGroups}])
`
}

declare module 'rollup' {
  export interface Watcher {
    tasks: Task[]
  }
  export interface Task {
    invalidate(id: string, isTransformDependency?: boolean): void
  }
}

const parsePattern = (file: string): Promise => {}

export const start = () => {
  watchPatterns(async patternGroups => {
    await Promise.all(
      patternGroups.map(
        async patternGroup =>
          await Promise.all(
            patternGroup.patterns.map(async pattern => {
              virtualModuleLoader.registerModule(
                pattern.file,
                await parsePattern(pattern.file),
              )
            }),
          ),
      ),
    )
    virtualModuleLoader.registerModule(
      'virtual-module',
      await generateModule(patternGroups),
    )
  })
  const watcher = watch([
    createRollupConfig(process.cwd(), process.env.NODE_ENV === 'development'),
  ])
  watcher.on('event', (event: RollupWatchEvent) => {
    if (event.code === 'FATAL') {
      throw event.error
    }
    console.log(event)
  })
  virtualModuleLoader.onChange(id => {
    // notify watcher of virtual file change
    watcher.tasks.forEach(task => task.invalidate(id))
  })
}

process.on('unhandledRejection', e => {
  console.log(e)
})
