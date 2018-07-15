export type ChangeWatcher = (id: string) => void

class VirtualModuleProvider {
  private modules: { [id: string]: string }
  private changeWatchers: ChangeWatcher[] = []

  constructor(modules: { [id: string]: string } = {}) {
    this.modules = modules
  }

  registerModule(id: string, contents: string) {
    if (this.modules[id] === contents) {
      return
    }
    this.modules[id] = contents
    this.changeWatchers.forEach(watcher => watcher(id))
  }

  moduleLoader = (id: string): string | null => {
    const virtualModule = this.modules[id]
    if (virtualModule === undefined) {
      return null
    }
    return virtualModule
  }

  resolver = (id: string): string | null =>
    this.modules[id] !== undefined ? id : null

  onChange(watcher: ChangeWatcher) {
    if (typeof watcher !== 'function') {
      throw new TypeError(
        `Watcher must be a function, recieved ${typeof watcher}`,
      )
    }
    this.changeWatchers.push(watcher)
  }
}

export default VirtualModuleProvider
