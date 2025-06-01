import micromatch from 'micromatch'
import { merge } from 'rattail'
import { BuiltinMeta, MetadataOption, Options } from './types'
import { getRelativePath, insertToHead, replaceHtmlLang, replaceTitle, toMetaString } from './util'

const builtinMeta = {
  charset: true,
  viewport: true,
  compatibleIE: true,
  notranslate: true,
  notelephone: true,
  og: true,
} as const

const builtinMetaProp: Record<Exclude<keyof BuiltinMeta, 'og'>, Record<string, string>> = {
  charset: { charset: 'UTF-8' },
  viewport: {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover',
  },
  compatibleIE: { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  notranslate: { name: 'google', content: 'notranslate' },
  notelephone: { name: 'format-detection', content: 'telephone=no' },
}

export function getMetaConfig(options: Options) {
  const { projectRoot, filePath, config } = options
  const { entries = {}, builtinMeta: globBuiltinMeta, content } = config
  const relativePath = getRelativePath(projectRoot, filePath)
  const entryConfigs = Object.entries(entries)
    .filter(([glob]) => micromatch.isMatch(relativePath, glob))
    .map(([_, config]) => config)

  return merge(
    {
      builtinMeta: {
        ...builtinMeta,
        ...globBuiltinMeta,
      },
      content,
    },
    ...entryConfigs,
  )
}

export function getBuiltinMetas(builtinMeta: BuiltinMeta) {
  return Object.entries(builtinMeta)
    .filter(([key, value]) => key !== 'og' && value)
    .map(([key]) => builtinMetaProp[key as Exclude<keyof BuiltinMeta, 'og'>])
}

export function getOpenGraphMetas(enable: boolean, content: MetadataOption['og']) {
  if (!enable || !content) {
    return []
  }

  return Object.entries(content).map(([property, content]) => ({ property: `og:${property}`, content }))
}

export function transform(options: Options) {
  const { code } = options
  const { builtinMeta, content: { lang, title, description, keywords, metas, og } = {} } = getMetaConfig(options)
  const ogContent = {
    title: og?.title ?? title,
    description: og?.description ?? description,
    ...og,
  }

  const mergedMetas = [
    ...getBuiltinMetas(builtinMeta),
    ...getOpenGraphMetas(builtinMeta.og, ogContent),
    ...(metas || []),
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
  ]

  let newCode = code

  if (title) {
    newCode = replaceTitle(newCode, title)
  }

  newCode = replaceHtmlLang(newCode, lang)
  newCode = insertToHead(newCode, toMetaString(mergedMetas))
  return newCode
}
