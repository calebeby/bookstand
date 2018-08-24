import globby from 'globby'
import { join } from 'path'
import { readFile, exists } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)
const existsAsync = promisify(exists)

const readConfig = async (cwd: string): Promise<BookstandConfig> =>
  JSON.parse(await readFileAsync(join(cwd, 'bookstand.json'), 'utf8'))

type BookstandConfig = string[]

const findPatternsMatchingConfig = async (
  config: BookstandConfig,
  cwd: string,
) => {
  const allDirectories = await globby(config, { cwd, onlyDirectories: true })
  const matchingDirectories = await Promise.all(
    allDirectories.map(async directory => {
      const readmePath = join(directory, 'bookstand.md')
      return (await existsAsync(join(cwd, readmePath))) ? readmePath : false
    }),
  )
  return matchingDirectories.filter((p): p is string => p !== false)
}

const findPatterns = async (cwd = process.cwd()) => {
  const config = await readConfig(cwd)
  return findPatternsMatchingConfig(config, cwd)
}

export default findPatterns
