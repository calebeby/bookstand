import { createRollupConfig } from '.'

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
    expect(createRollupConfig('')).toMatchSnapshot()
  })
})
