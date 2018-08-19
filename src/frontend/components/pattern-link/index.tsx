import { h } from 'preact'
import { Pattern } from '../..'
import style from './style.css'

interface Props {
  key?: string
  pattern: Pattern
  groupName: string
}

const PatternLink = ({ pattern, groupName }: Props) => (
  <a
    class={style.patternLink}
    href={`/${groupName}/${pattern.name}`.toLowerCase()}
  >
    {pattern.name}
  </a>
)

export default PatternLink
