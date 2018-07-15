import VirtualModuleProvider from './virtual-module-loader'

describe('loader', () => {
  it('should retrieve saved module', () => {
    const VirtualModule = new VirtualModuleProvider()
    const loader = VirtualModule.moduleLoader
    VirtualModule.registerModule('asdf', 'export default "hello"')
    expect(loader('asdf')).toEqual('export default "hello"')
  })

  it('should return null for nonexistent module', () => {
    const VirtualModule = new VirtualModuleProvider()
    const loader = VirtualModule.moduleLoader
    expect(loader('foo')).toEqual(null)
  })
})

describe('resolver', () => {
  it('should resolve an existing module', () => {
    const VirtualModule = new VirtualModuleProvider()
    const resolver = VirtualModule.resolver
    VirtualModule.registerModule('foo', 'blah')
    expect(resolver('foo')).toEqual('foo')
  })

  it('should return null for a nonexistent module', () => {
    const VirtualModule = new VirtualModuleProvider()
    const resolver = VirtualModule.resolver
    expect(resolver('foo')).toEqual(null)
  })
})
