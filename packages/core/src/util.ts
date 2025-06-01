import path from 'node:path'

const htmlTagRegex = /<html\b([^>]*)>/i
const headTagRegex = /<head\b([^>]*)>/i
const titleTagRegex = /<title>([\s\S]*?)<\/title>/i

export function replaceHtmlLang(code: string, lang?: string) {
  if (!lang) {
    return code
  }

  return code.replace(htmlTagRegex, (_, attrs) => {
    if (/lang\s*=/.test(attrs)) {
      return `<html${attrs.replace(/lang\s*=\s*(['"])[^'"]*\1/, `lang="${lang}"`)}>`
    }
    return `<html lang="${lang}"${attrs}>`
  })
}

export function insertToHead(code: string, content: string) {
  return code.replace(headTagRegex, (match) => `${match}\n${content}`)
}

export function replaceTitle(code: string, title: string) {
  return code.replace(titleTagRegex, `<title>${title}</title>`)
}

export function getRelativePath(from: string, to: string) {
  return path.relative(from, to).replace(/\\/g, '/')
}

export function toMetaString(metas: Record<string, string | undefined>[]) {
  return metas.reduce((code, meta) => {
    const props = Object.entries(meta).map(([property, value]) => `${property}="${value ?? ''}"`)
    return code + `\t\t<meta ${props.join(' ')} />\n`
  }, '')
}
