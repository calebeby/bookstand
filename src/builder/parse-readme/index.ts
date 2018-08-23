import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
import Token from 'markdown-it/lib/token'

const md = new MarkdownIt({ html: true })

const transformTokens = (outputTokens: Token[], token: Token): Token[] => {
  token.children = (token.children || []).reduce(transformTokens, [])

  if (token.type === 'fence') {
    const content = token.content.trim()
    const lang = token.info
    if (lang === 'js' || lang === 'javascript') {
      const newToken = new Token('html_block', '', 0)
      newToken.content = `<BookstandRendererPreact>
  {${content}}
</BookstandRendererPreact>
`
      outputTokens.push(newToken)
    }
  }

  return outputTokens.concat(token)
}

const parseReadme = (readme: string) => {
  const { content: mdContent, data } = matter(readme.trim(), {
    excerpt: true,
  }) as { content: string; data: { import?: string } }
  const parsed = md.parse(mdContent, {}).reduce(transformTokens, [])
  const printed = md.renderer.render(parsed, {}, {})
  const template = `
${data.import ? 'import ' + data.import : ''}
import { h } from 'preact'
import BookstandRendererPreact from 'bookstand-renderer-preact'

const Template = () => (
  <div>
    ${printed.replace(/\n/g, '\n    ').trim()}
  </div>
)

export default Template
`
  return template
}

export default parseReadme
