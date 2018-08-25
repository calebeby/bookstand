import globby from 'globby'
import { join } from 'path'
import { readFile } from 'fs'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)

const readConfig = async (cwd: string): Promise<BookstandConfig> =>
  JSON.parse(await readFileAsync(join(cwd, 'bookstand.json'), 'utf8'))

type BookstandConfig = string[]

const findPatterns = async (cwd = process.cwd()) => {
  const config = await readConfig(cwd)
  return globby(config, { cwd })
}

export default findPatterns
