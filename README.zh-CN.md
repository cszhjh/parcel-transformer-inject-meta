# parcel-transformer-inject-meta

**中文** | [English](./README.md)

一个用于 Parcel v2 的 HTML 元信息注入插件，支持通过配置向 HTML 文件的 `<head>` 中插入 `<meta>`、`<title>` 等标签，支持全局和基于文件路径的个性化配置。

## ✨ 特性

✅ 支持注入常见的 `<meta>` 标签，如 `charset`、`viewport`、`og` 等。

✅ 支持修改或添加 `<title>`、`<meta name="description">`、`<meta name="keywords">`、Open Graph 标签。

✅ 支持使用 glob 路径模式为不同 HTML 文件设置不同配置。

✅ 可配置是否启用内建 meta 标签，灵活控制输出内容。

## 📦 安装

```bash
# yarn
yarn add parcel-transformer-inject-meta -D
# npm
npm install parcel-transformer-inject-meta -D
# pnpm
pnpm add  parcel-transformer-inject-meta -D
```

## 🛠 使用配置

在 .parcelrc 文件中添加如下内容：

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

请将插件配置写入项目根目录的 `inject-meta.config.json` 文件，或在 `package.json` 中添加 `injectMeta` 字段。

```json
{
  // 控制是否启用内建的 meta 标签
  "builtinMeta": {
    "charset": true,
    "viewport": true,
    "compatibleIE": true,
    "notranslate": true,
    "notelephone": true,
    "og": true
  },
  // 设置页面元信息
  "content": {
    "lang": "en",
    "title": "我的站点",
    "description": "这是我的站点描述",
    "keywords": "示例, 站点, meta",
    "og": {
      "type": "website",
      "title": "我的站点",
      "description": "欢迎访问我的站点",
      "url": "https://example.com",
      "image": "https://example.com/cover.png"
    },
    "metas": [
      { "name": "robots", "content": "index, follow" }
    ]
  },
  // 使用 glob 路径为不同 HTML 文件配置不同元信息
  "entries": {
    "cn/**/*.html": {
      "content": {
        "lang": "zh",
        "title": "我的中文站点",
        "description": "这是我的中文页面描述",
        "keywords": "中文, 示例, meta"
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

## 💡 注意事项

* 插件会自动在 <head> 标签后插入配置的标签。
* `<html lang="...">` 属性会被修改或自动添加。
* Open Graph 标签的插入依赖 `builtinMeta.og = true`。
* glob 匹配支持多级路径，比如 `cn/**/*.html`。

## 📜 License

MIT License
