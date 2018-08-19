import { h, render, FunctionalComponent } from 'preact'
import PatternPage from './pattern-page'
import { Router, Route } from 'preact-router'
import style from './style.css'
import SideBar from './components/sidebar'

export interface BookstandRenderer<T extends any> {
  mount: (element: Element, pattern: T) => void
  unmount: (element: Element) => void
}

export interface Pattern {
  name: string
  renderer: BookstandRenderer<any>
  pattern: any
}

export type PatternGroups = {
  name: string
  patterns: Pattern[]
}[]

interface Props {
  patternGroups: PatternGroups
}

const Error404 = () => <h1 style={{ color: 'red' }}>404</h1>

const normalizePatternPage = (patternGroups: PatternGroups) => ({
  groupName,
  patternName,
}: {
  groupName: string
  patternName: string
}) => {
  const matchingPatternGroup = patternGroups.find(
    ({ name }) => name.toLowerCase() === groupName,
  )
  if (!matchingPatternGroup) return <Error404 />
  const matchingPattern = matchingPatternGroup.patterns.find(
    ({ name }) => name.toLowerCase() === patternName,
  )
  if (!matchingPattern) return <Error404 />
  return <PatternPage pattern={matchingPattern} />
}

const App = ({ patternGroups }: Props) => {
  return (
    <div id={style.app}>
      <SideBar patternGroups={patternGroups} />
      <Router>
        <Route
          path="/"
          component={normalizePatternPage(patternGroups) as FunctionalComponent}
        />
        <Route
          path="/:groupName/:patternName"
          component={normalizePatternPage(patternGroups) as FunctionalComponent}
        />
      </Router>
    </div>
  )
}

export default function bookstand(patternGroups: PatternGroups) {
  render(<App patternGroups={patternGroups} />, document.body)
}
