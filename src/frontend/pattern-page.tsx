import { Component, h } from 'preact'
import { Pattern } from '.'

interface Props {
  pattern: Pattern
}

export default class PatternPage extends Component<Props, {}> {
  element?: Element
  componentDidMount() {
    this.mount(this.props.pattern)
  }
  componentDidUpdate() {
    this.mount(this.props.pattern)
  }
  mount(pattern: Pattern) {
    const el = document.getElementById('pattern-root') as HTMLMainElement | null
    if (!el) return
    pattern.renderer.mount(el, pattern.pattern)
  }
  render({ pattern }: Props) {
    return (
      <main>
        <h3>{pattern.name}</h3>
        <div id="pattern-root" />
      </main>
    )
  }
}
