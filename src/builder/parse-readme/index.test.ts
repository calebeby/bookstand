import parseReadme from '.'

const md = (strings: TemplateStringsArray): string => strings.join('')

test('parses README', () => {
  const parsed = parseReadme(md`
---
import: Button from '.'
---

# Button

Normal button:

~~~js
<Button>This is a button</Button>
~~~

<div>Hi</div>

With \`href\`:

~~~js
<Button href="/asdf">Click Me</Button>
~~~
  `)
  expect(parsed).toMatchInlineSnapshot(`
"
import Button from '.'
import { h } from 'preact'
import BookstandRendererPreact from 'bookstand-renderer-preact'

const Template = () => (
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
)

export default Template
"
`)
})
