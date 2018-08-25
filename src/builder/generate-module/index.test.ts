import generateModule from '.'

test('generateModule', () => {
  expect(generateModule(['/foo/bar/baz', '/asdf/asdfljk']))
    .toMatchInlineSnapshot(`
"
import { h, render } from 'preact'
import Bookstand from './bookstand'

import FooBarBaz from '/foo/bar/baz'
import AsdfAsdfljk from '/asdf/asdfljk'

const patterns = [FooBarBaz,AsdfAsdfljk]

render(<Bookstand patterns={patterns} />, document.body)
"
`)
})
