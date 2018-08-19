import { h } from 'preact'
import { PatternGroups } from '../..'
import PatternLink from '../pattern-link'

interface Props {
  patternGroups: PatternGroups
}

const SideBar = ({ patternGroups }: Props) => (
  <aside>
    {patternGroups.map(group => (
      <div key={group.name}>
        <h1>{group.name}</h1>
        {group.patterns.map(pattern => (
          <PatternLink
            key={pattern.name}
            pattern={pattern}
            groupName={group.name}
          />
        ))}
      </div>
    ))}
  </aside>
)

export default SideBar
