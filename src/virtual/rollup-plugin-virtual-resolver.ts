import { Plugin } from 'rollup'
import VirtualModuleProvider from './virtual-module-loader'

const virtualResolver = (
  virtualModuleLoader: VirtualModuleProvider,
): Plugin => ({
  name: 'rollup-plugin-virtual-resolver',
  load: virtualModuleLoader.moduleLoader,
})
export default virtualResolver
