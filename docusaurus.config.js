// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Swift 编程语言',
  tagline: '可能是最用心的翻译了吧。',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      mdxCrossCompilerCache: true,
      rspackBundler: false,
      rspackPersistentCache: false,
      ssgWorkerThreads: true,
    },
  },

  // Set the production url of your site here
  url: 'https://www.cnswift.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'R0uter', // Usually your GitHub org/user name.
  projectName: 'cnswiftorg', // Usually your repo name.

  onBrokenLinks: 'ignore',
  markdown: {
    format: 'md',
    emoji: true,
    hooks: {
      onBrokenMarkdownLinks: 'ignore',
    },
  },
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/R0uter/cnswiftorg',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/R0uter/cnswiftorg',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Swift 编程语言',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Swift 指南',
          },
          {to: '/blog', label: '官方博客翻译', position: 'left'},
          {
            href: 'https://github.com/R0uter/cnswiftorg',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '链接',
            items: [
              {
                label: 'Swift 指南',
                to: '/a-swift-tour',
              },
              {
                label: '落格工作室',
                href: 'https://im.logcg.com',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '官方博客翻译',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/R0uter/cnswiftorg',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} cnswift.org, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['swift'],
      },
    }),
};

export default config;
