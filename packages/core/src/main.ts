import { Transformer } from '@parcel/plugin'
import { transform } from './transform'
import type { MetaConfig } from './types'

export default new Transformer<MetaConfig | undefined>({
  loadConfig: async ({ config }) => {
    const result = await config.getConfig(['inject-meta.config.json'], {
      packageKey: 'injectMeta',
    })
    return result?.contents as MetaConfig | undefined
  },
  transform: async ({ asset, options: { projectRoot }, config = {} }) => {
    const code = await asset.getCode()
    const newCode = transform({
      code,
      config,
      projectRoot,
      filePath: asset.filePath,
    })
    asset.setCode(newCode)
    return [asset]
  },
})
