import { expect, test } from 'vitest'
import { transform } from '../transform'

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

const config = {
  content: {
    title: 'title',
    description: 'description',
    lang: 'en',
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
    		<meta name="keywords" content="" />

        <title>title</title>
      </head>
      <body>
        <h1>Parcel Vanilla App</h1>
      </body>
    </html>
    "
  `)
})
