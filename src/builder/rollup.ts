import { InputOptions, OutputOptions } from 'rollup'
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
  virtualModuleLoader: VirtualModuleProvider,
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
