# parcel-transformer-inject-meta

**English** | [中文](./README.zh-CN.md)

A Parcel v2 plugin for injecting HTML metadata. It supports injecting `<meta>`, `<title>`, and other tags into the `<head>` of HTML files through configuration, with both global and file-specific options via glob patterns.

## ✨ Features

✅ Inject common `<meta>` tags like `charset`, `viewport`, `og`, etc.

✅ Support modifying or adding `<title>`, `<meta name="description">`, `<meta name="keywords">`, and Open Graph tags.

✅ Support glob-based file-specific configuration.

✅ Toggle built-in meta tags with flexible configuration.

## 📦 Installation

```bash
# yarn
yarn add parcel-transformer-inject-meta -D
# npm
npm install parcel-transformer-inject-meta -D
# pnpm
pnpm add parcel-transformer-inject-meta -D
```

## 🛠 Configuration

In your `.parcelrc` file, add the following:

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.html": [
      "parcel-transformer-inject-meta",
      "..."
    ]
  }
}
```

Plugin options should be written in a configuration file named `inject-meta.config.json` in the project root, or under the `injectMeta` field in `package.json`.

```json
{
  "builtinMeta": {
    "charset": true,
    "viewport": true,
    "compatibleIE": true,
    "notranslate": true,
    "notelephone": true,
    "og": true
  },
  "content": {
    "lang": "en",
    "title": "My Site",
    "description": "This is my site description",
    "keywords": "example, site, meta",
    "og": {
      "type": "website",
      "title": "My Site",
      "description": "Welcome to my site",
      "url": "https://example.com",
      "image": "https://example.com/cover.png"
    },
    "metas": [
      { "name": "robots", "content": "index, follow" }
    ]
  },
  "entries": {
    "cn/**/*.html": {
      "content": {
        "lang": "zh",
        "title": "My Chinese Site",
        "description": "This is the description for my Chinese pages",
        "keywords": "Chinese, example, meta"
      }
    },
    "en/**/*.html": {
      "content": {
        "lang": "en",
        "title": "My English Site"
      }
    }
  }
}
```

## 💡 Notes

* The plugin will automatically insert the configured tags right after the `<head>` tag.
* The `<html lang="...">` attribute will be modified or added automatically.
* Open Graph tags are inserted only when `builtinMeta.og = true`.
* Glob patterns support nested paths, e.g., `cn/**/*.html`.

## 📜 License

MIT License
