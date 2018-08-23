declare module 'rollup-plugin-*' {
  import { Plugin } from 'rollup'
  const plugin: (opts?: any) => Plugin
  export default plugin
}

declare module 'rollup-plugin-terser' {
  import { Plugin } from 'rollup'
  export const terser: (opts?: any) => Plugin
}

declare module 'markdown-it/lib/token' {
  import { Token as MDToken } from 'markdown-it'
  class Token implements MDToken {
    constructor(type: string, tag: string, nesting: -1 | 0 | 1)
    attrGet: (name: string) => string | null
    attrIndex: (name: string) => number
    attrJoin: (name: string, value: string) => void
    attrPush: (attrData: string[]) => void
    attrSet: (name: string, value: string) => void
    attrs: string[][]
    block: boolean
    children: MDToken[]
    content: string
    hidden: boolean
    info: string
    level: number
    map: number[]
    markup: string
    meta: any
    nesting: number
    tag: string
    type: string
  }
  export default Token
}
