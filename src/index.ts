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
    format: 'iife',
  },
  plugins: [virtualResolver(virtualModuleLoader)],
})

const start = () => {
  const watcher = watch([createRollupConfig(process.cwd())])
}
