export interface Options {
  projectRoot: string
  filePath: string
  code: string
  config: MetaConfig
}

export interface MetaConfig {
  builtinMeta?: BuiltinMeta
  content?: MetadataOption
  entries?: {
    [glob: string]: Pick<MetaConfig, 'builtinMeta' | 'content'>
  }
}

export interface BuiltinMeta {
  charset?: boolean
  viewport?: boolean
  compatibleIE?: boolean
  notranslate?: boolean
  notelephone?: boolean
  og?: boolean
}

export interface MetadataOption {
  lang?: string
  title?: string
  description?: string
  keywords?: string
  og?: {
    type?: string
    title?: string
    description?: string
    url?: string
    image?: string
  }
  metas?: Record<string, string>[]
}
