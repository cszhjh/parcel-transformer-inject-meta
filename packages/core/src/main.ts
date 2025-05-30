import { Transformer } from '@parcel/plugin'

export function transform(code: string) {
  return code
}

export default new Transformer({
  transform: ({ asset }) => {
    return [asset]
  },
})
