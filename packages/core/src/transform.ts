import micromatch from 'micromatch'
import { merge } from 'rattail'
import { BuiltinMeta, MetaConfig, Options } from './types'
import { getRelativePath, insertToHead, replaceHtmlLang, replaceTitle } from './util'

const builtinMeta = {
  charset: true,
  viewport: true,
  compatibleIE: true,
  notranslate: true,
  notelephone: true,
  og: true,
}
const builtinMetaCode: Record<Exclude<keyof BuiltinMeta, 'og'>, string> = {
  charset: '<meta charset="UTF-8" />',
  viewport:
    '<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover" />',
  compatibleIE: '<meta http-equiv="X-UA-Compatible" content="IE=edge" />',
  notranslate: '<meta name="google" content="notranslate" />',
  notelephone: '<meta name="format-detection" content="telephone=no" />',
} as const

export function getMetaConfig(options: Options): Omit<MetaConfig, 'entries'> {
  const { projectRoot, filePath, config } = options
  const { entries = {}, builtinMeta: globBuiltinMeta, content } = config

  const relativePath = getRelativePath(projectRoot, filePath)
  const entriesMeta = Object.entries(entries).filter(([glob]) => micromatch.isMatch(relativePath, glob))
  const mergedEntriesConfig = entriesMeta.reduce(
    (config, [_, value]) => merge(config, value),
    {} as Omit<MetaConfig, 'entries'>,
  )

  return merge(
    {
      builtinMeta: {
        ...builtinMeta,
        ...globBuiltinMeta,
      },
      content,
    },
    mergedEntriesConfig,
  )
}

export function transform(options: Options) {
  const config = getMetaConfig(options)
  const { code } = options
  const { builtinMeta, content: { lang, title, description, keywords, metas, og } = {} } = config
  const ogContent = {
    ...og,
    title: og?.title ?? title,
    description: og?.description ?? description,
  }

  const builtinCode = Object.entries(builtinMetaCode).reduce(
    (code, [key, meta]) => code + (builtinMeta?.[key as keyof BuiltinMeta] ? `\t\t${meta}\n` : ''),
    '',
  )

  const mergedMetas = [
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    ...(builtinMeta?.og
      ? Object.entries(ogContent).map(([property, content]) => ({ property: `og:${property}`, content }))
      : []),
    ...(metas || []),
  ].filter(({ content }) => content)
  const metaCode = mergedMetas.reduce((code, meta) => {
    const props = Object.entries(meta).map(([property, value]) => `${property}="${value}"`)
    return code + `\t\t<meta ${props.join(' ')} />\n`
  }, '')

  let newCode = code
  if (title) {
    newCode = replaceTitle(newCode, title)
  }

  newCode = replaceHtmlLang(newCode, lang)
  newCode = insertToHead(newCode, builtinCode + metaCode)
  return newCode
}
