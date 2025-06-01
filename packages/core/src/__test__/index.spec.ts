import { expect, test } from 'vitest'
import { transform } from '../transform'
import { MetaConfig } from '../types'

const template = `
<!doctype html>
<html lang="en">
  <head>
    <title>Parcel Vanilla App</title>
  </head>
  <body>
    <h1>Parcel Vanilla App</h1>
  </body>
</html>
`

const config: MetaConfig = {
  content: {
    title: 'title',
    description: 'description',
    lang: 'en',
  },
  entries: {
    'src/index.html': {
      builtinMeta: {
        viewport: false,
      },
      content: {
        title: 'index title',
        description: 'index description',
        lang: 'zh-CN',
        metas: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      },
    },
    'src/en.html': {
      content: {
        title: 'en title',
        description: 'en description',
        lang: 'en',
      },
    },
  },
}

test('basic usage', () => {
  expect(
    transform({
      code: template,
      projectRoot: '.',
      config,
      filePath: 'src/index.html',
    }),
  ).toMatchInlineSnapshot(`
    "
    <!doctype html>
    <html lang="zh-CN">
      <head>
    		<meta charset="UTF-8" />
    		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    		<meta name="google" content="notranslate" />
    		<meta name="format-detection" content="telephone=no" />
    		<meta property="og:title" content="index title" />
    		<meta property="og:description" content="index description" />
    		<meta name="viewport" content="width=device-width, initial-scale=1" />
    		<meta name="description" content="index description" />
    		<meta name="keywords" content="" />

        <title>index title</title>
      </head>
      <body>
        <h1>Parcel Vanilla App</h1>
      </body>
    </html>
    "
  `)
})
