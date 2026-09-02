import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Nuke Script Docs',
  description: 'Nuke JavaScript runtime and API reference',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#ec4899' }],
  ],
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },
    siteTitle: 'Nuke Script Docs',

    nav: [
      { text: '指南', link: '/guides/runtime' },
      { text: 'API 参考', link: '/reference/' },
      { text: '迁移与版本', link: '/migration/v2' },
    ],

    sidebar: [
      {
        text: '开始使用',
        collapsible: true,
        collapsed: false,
        items: [
          { text: '快速开始', link: '/getting-started' },
          { text: '脚本包', link: '/concepts/packages' },
          { text: '权限与能力', link: '/concepts/permissions' },
        ],
      },
      {
        text: '开发指南',
        collapsible: true,
        collapsed: false,
        items: [
          { text: '运行模型', link: '/guides/runtime' },
          { text: '生命周期', link: '/guides/lifecycle' },
          { text: '配置 Schema', link: '/guides/configuration' },
          { text: '消息脚本', link: '/guides/messaging' },
        ],
      },
      {
        text: 'API 参考',
        collapsible: true,
        collapsed: false,
        items: [
          { text: 'API 总览', link: '/reference/' },
          { text: 'Runtime', link: '/reference/runtime' },
          { text: 'Config', link: '/reference/configuration' },
          { text: 'Logging', link: '/reference/logging' },
          { text: 'Timers', link: '/reference/timers' },
          { text: 'Encoding', link: '/reference/encoding' },
          { text: 'Crypto', link: '/reference/crypto' },
          { text: 'UI', link: '/reference/ui' },
          { text: 'Java Bridge', link: '/reference/java' },
          { text: 'HTTP', link: '/reference/http' },
          { text: '文件系统', link: '/reference/filesystem' },
          { text: '消息', link: '/reference/messaging' },
          { text: '错误', link: '/reference/errors' },
        ],
      },
      {
        text: '迁移与版本',
        collapsible: true,
        collapsed: false,
        items: [
          { text: 'API v2 迁移', link: '/migration/v2' },
          { text: '变更记录', link: '/changelog' },
        ],
      },
    ],

    outline: [2, 3],
    outlineTitle: '本页目录',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdatedText: '最后更新',
    editLink: {
      pattern: 'https://HOST/ORG/APP/edit/main/docs/:path',
      text: '编辑此页',
    },
    footer: {
      message: 'Nuke Script API v2 · Unreleased',
      copyright: 'Copyright © Nuke Developers',
    },
  },
})
