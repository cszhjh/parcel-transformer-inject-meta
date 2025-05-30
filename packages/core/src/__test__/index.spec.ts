import { expect, test } from 'vitest'
import { transform } from '../main'

const template = `
<!doctype html>
<html>
  <head>
    <title>Parcel Vanilla App</title>
  </head>
  <body>
    <h1>Parcel Vanilla App</h1>
  </body>
</html>
`

test('basic usage', () => {
  expect(transform(template)).toMatchInlineSnapshot(`
    "
    <!doctype html>
    <html>
      <head>
        <title>Parcel Vanilla App</title>
      </head>
      <body>
        <h1>Parcel Vanilla App</h1>
      </body>
    </html>
    "
  `)
})
