import { watch, InputOptions, OutputOptions } from 'rollup'
import { join } from 'path'
import virtualResolver from './virtual/rollup-plugin-virtual-resolver'
import VirtualModuleProvider from './virtual/virtual-module-loader'

interface BaseRollupConfig extends InputOptions {
  output: OutputOptions
}

type RollupConfig = BaseRollupConfig

interface Pattern {
  name: string
  id: string
  renderer: string
  rendererOpts: any
  patternPath: string
}

interface PatternGroup {
  name: string
  patterns: Pattern[]
}

const virtualModuleLoader = new VirtualModuleProvider()

export const createRollupConfig = (dir: string): RollupConfig => ({
  input: 'virtual-module',
  output: {
    file: join(dir, 'dist', 'bundle.js'),
    name: 'Bundle',
    format: 'iife',
  },
  plugins: [virtualResolver(virtualModuleLoader)],
})

virtualModuleLoader.registerModule('virtual-module', 'console.log("hello")')

declare module 'rollup' {
  export interface Watcher {
    invalidate: () => void
  }
}

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

export const start = () => {
  const watcher = watch([createRollupConfig(process.cwd())])
  watcher.on('event', (event: RollupWatchEvent) => {
    if (event.code === 'FATAL') {
      throw event.error
    }
    console.log(event)
  })
  virtualModuleLoader.onChange(() => watcher.invalidate())
}
