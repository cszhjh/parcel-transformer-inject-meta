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
    lang: 'en',
    title: 'title',
    description: 'description',
    keywords: 'keywords',
  },
}

test('basic usage', () => {
  const options = {
    code: template,
    projectRoot: '.',
    config,
    filePath: 'src/index.html',
  }

  expect(transform(options)).toMatchInlineSnapshot(`
    "
    <!doctype html>
    <html lang="en">
      <head>
    		<meta charset="UTF-8" />
    		<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover" />
    		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    		<meta name="google" content="notranslate" />
    		<meta name="format-detection" content="telephone=no" />
    		<meta property="og:title" content="title" />
    		<meta property="og:description" content="description" />
    		<meta name="description" content="description" />
    		<meta name="keywords" content="keywords" />

        <title>title</title>
      </head>
      <body>
        <h1>Parcel Vanilla App</h1>
      </body>
    </html>
    "
  `)
})

test('entries', () => {
  const options = {
    code: template,
    projectRoot: '.',
    config: {
      ...config,
      entries: {
        'src/*.html': {
          content: {
            lang: 'en',
            title: 'Test Title',
            description: 'Test Description',
            keywords: 'Test, Keywords',
          },
        },
        'src/index.html': {
          content: {
            title: 'Index Title',
            og: {
              url: 'https://example.com',
            },
          },
        },
      },
    },
    filePath: 'src/index.html',
  }

  expect(transform(options)).toMatchInlineSnapshot(`
    "
    <!doctype html>
    <html lang="en">
      <head>
    		<meta charset="UTF-8" />
    		<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover" />
    		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
    		<meta name="google" content="notranslate" />
    		<meta name="format-detection" content="telephone=no" />
    		<meta property="og:title" content="Index Title" />
    		<meta property="og:description" content="Test Description" />
    		<meta property="og:url" content="https://example.com" />
    		<meta name="description" content="Test Description" />
    		<meta name="keywords" content="Test, Keywords" />

        <title>Index Title</title>
      </head>
      <body>
        <h1>Parcel Vanilla App</h1>
      </body>
    </html>
    "
  `)
})
