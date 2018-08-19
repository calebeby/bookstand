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

describe('on change watcher', () => {
  it('should call onChange when a virtual file is changed', () => {
    const watcherMock = jest.fn()
    const VirtualModule = new VirtualModuleProvider()
    VirtualModule.onChange((id: string) => watcherMock(id))
    VirtualModule.registerModule('foo', 'contents')
    expect(watcherMock).toHaveBeenCalledTimes(1)
    expect(watcherMock).toHaveBeenCalledWith('foo')
    VirtualModule.registerModule('foo', 'contents')
    // should not fire when contents is the same
    expect(watcherMock).toHaveBeenCalledTimes(1)
    VirtualModule.registerModule('foo', 'contents2')
    // should fire again when contents change
    expect(watcherMock).toHaveBeenCalledTimes(2)
  })
  it('should allow multiple onChange listeners', () => {
    const watcherMock1 = jest.fn()
    const watcherMock2 = jest.fn()
    const VirtualModule = new VirtualModuleProvider()
    VirtualModule.onChange((id: string) => watcherMock1(id))
    VirtualModule.onChange((id: string) => watcherMock2(id))
    VirtualModule.registerModule('foo', 'contents')
    expect(watcherMock1).toHaveBeenCalledTimes(1)
    expect(watcherMock2).toHaveBeenCalledTimes(1)
  })
  it('should throw when onChange is not a function', () => {
    const VirtualModule = new VirtualModuleProvider()
    expect(() => VirtualModule.onChange(2)).toThrowError(
      'Watcher must be a function, recieved number',
    )
  })
})
