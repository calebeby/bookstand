import findPatterns from '.'
import { join } from 'path'

test('findPatterns', async () => {
  expect(await findPatterns(join(__dirname, 'fixtures', 'base')))
    .toMatchInlineSnapshot(`
Array [
  "components/button/bookstand.md",
]
`)
})
