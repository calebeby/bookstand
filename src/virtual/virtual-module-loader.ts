class VirtualModuleProvider {
  private modules: { [id: string]: string }

  constructor(modules: { [id: string]: string } = {}) {
    this.modules = modules
  }

  registerModule(id: string, contents: string) {
    this.modules[id] = contents
  }

  moduleLoader = (id: string): string | null => {
    const virtualModule = this.modules[id]
    if (virtualModule === undefined) {
      return null
    }
    return virtualModule
  }
}

export default VirtualModuleProvider
