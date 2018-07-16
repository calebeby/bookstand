import { createRollupConfig, start } from '.'

// const groups = {
//   groups: [
//     {
//       name: 'Styles',
//       patterns: [
//         {
//           name: 'Fonts',
//           id: 'lksadjflskjdfs',
//           renderer: 'bookstand-html-renderer',
//           rendererOpts: {},
//           patternPath: './patterns/fonts',
//         },
//       ],
//     },
//     {
//       name: 'Components',
//       patterns: [
//         {
//           name: 'Button',
//           id: 'aslkdfjasdlkfj',
//           renderer: 'bookstand-preact-renderer',
//           rendererOpts: {
//             opts: 'here',
//           },
//           patternPath: './components/button',
//         },
//         {
//           name: 'TextInput',
//           id: 'kfjsdljlkaslfa',
//           renderer: 'bookstand-preact-renderer',
//           rendererOpts: {},
//           patternPath: './components/text-input',
//         },
//       ],
//     },
//   ],
// }

describe('createRollupConfig', () => {
  it('should match snapshot', () => {
    expect(createRollupConfig('')).toMatchInlineSnapshot(`
Object {
  "input": "virtual-module",
  "output": Object {
    "file": "dist/bundle.js",
    "format": "iife",
    "name": "Bundle",
  },
  "plugins": Array [
    Object {
      "load": [Function],
      "name": "rollup-plugin-virtual-resolver",
      "resolveId": [Function],
    },
  ],
}
`)
  })
})
