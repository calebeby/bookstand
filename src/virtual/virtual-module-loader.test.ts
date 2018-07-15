import VirtualModuleProvider from './virtual-module-loader'

test('can retrieve saved module', () => {
  const VirtualModule = new VirtualModuleProvider()
  VirtualModule.registerModule('asdf', 'export default "hello"')
  const loader = VirtualModule.moduleLoader
  expect(loader('asdf')).toEqual('export default "hello"')
})

test('returns null for nonexistent module', () => {
  const VirtualModule = new VirtualModuleProvider()
  const loader = VirtualModule.moduleLoader
  expect(loader('foo')).toEqual(null)
})
