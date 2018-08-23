import { createRollupConfig } from './rollup'
import VirtualModuleProvider from './virtual/virtual-module-loader'
import { watch } from 'rollup'

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

declare module 'rollup' {
  export interface Watcher {
    tasks: Task[]
  }
  export interface Task {
    invalidate(id: string, isTransformDependency?: boolean): void
  }
}

export const start = async () => {
  const virtualModuleLoader = new VirtualModuleProvider()
  virtualModuleLoader.registerModule(
    'virtual-module',
    await generateModule(patternGroups),
  )
  const watcher = watch([
    createRollupConfig(
      process.cwd(),
      process.env.NODE_ENV === 'development',
      virtualModuleLoader,
    ),
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
