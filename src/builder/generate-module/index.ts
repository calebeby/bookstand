import moduleToVariable from '../module-to-variable'

const im = (p: string) => `import ${moduleToVariable(p)} from '${p}'`

const generateModule = (patterns: string[]) => {
  return `
import { h, render } from 'preact'
import Bookstand from './bookstand'

${patterns.map(im).join('\n')}

const patterns = [${patterns.map(p => moduleToVariable(p)).join(',')}]

render(<Bookstand patterns={patterns} />, document.body)
`
}

export default generateModule
