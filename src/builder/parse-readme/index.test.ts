import parseReadme from '.'

const md = (strings: TemplateStringsArray): string => strings.join('')

test('parses README', () => {
  const parsed = parseReadme(
    '/foo/bar',
    md`
---
import: Button from '.'
name: Button
slug: /components/button
---

Normal button:

~~~js
<Button>This is a button</Button>
~~~

<div>Hi</div>

With \`href\`:

~~~js
<Button href="/asdf">Click Me</Button>
~~~
    `,
  )
  expect(parsed).toEqual({ name: 'Button', template: expect.any(String) })
  expect(parsed.template).toMatchInlineSnapshot(`
"
import Button from '.'
import { h } from 'preact'
import BookstandRendererPreact from 'bookstand-renderer-preact'

const output = {
  Template: () => (
    <div>
      <h1>Button</h1>
      <p>Normal button:</p>
      <BookstandRendererPreact>
        {<Button>This is a button</Button>}
      </BookstandRendererPreact>
      <pre><code class=\\"undefinedjs\\">&lt;Button&gt;This is a button&lt;/Button&gt;
      </code></pre>
      <div>Hi</div>
      <p>With <code>href</code>:</p>
      <BookstandRendererPreact>
        {<Button href=\\"/asdf\\">Click Me</Button>}
      </BookstandRendererPreact>
      <pre><code class=\\"undefinedjs\\">&lt;Button href=&quot;/asdf&quot;&gt;Click Me&lt;/Button&gt;
      </code></pre>
    </div>
  ),
  name: 'Button',
  slug: '/components/button'
}

export default Template
"
`)
})

test('throws when name is not passed', () => {
  expect(() =>
    parseReadme(
      '/foo/bar',
      md`
---
asdf: 'hi'
---

blah
      `,
    ),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Pattern must have \`name\` in frontmatter"`,
  )
})

test('defaults slug', () => {
  expect(
    parseReadme(
      '/foo/bar',
      md`
---
name: caleb
---

blah
      `,
    ),
  ).toMatchInlineSnapshot(`
Object {
  "name": "caleb",
  "template": "

import { h } from 'preact'
import BookstandRendererPreact from 'bookstand-renderer-preact'

const output = {
  Template: () => (
    <div>
      <h1>caleb</h1>
      <p>blah</p>
    </div>
  ),
  name: 'caleb',
  slug: '/foo/bar'
}

export default Template
",
}
`)
})
