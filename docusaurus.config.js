// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */

const config = {
  title: 'Akkiri的知识库',
  tagline: '基于Docusaurus',
  url: 'https://doc.irikka.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  i18n: {
    defaultLocale: 'zh-cn',
    locales: ['zh-cn'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
        {
          docs: {
            routeBasePath: 'docs',
            path: 'docs',
            remarkPlugins: [math],
            rehypePlugins: [katex],
            sidebarPath: require.resolve('./sidebars.js'),
            lastVersion: 'current',
            onlyIncludeVersions: ['current'],
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css'),
          },
        },
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'modeling',
        path: 'modeling',
        routeBasePath: 'modeling',
        remarkPlugins: [math],
        rehypePlugins: [katex],
        sidebarPath: require.resolve('./sidebars.js'),
      }, 
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'programming',
        path: 'programming',
        routeBasePath: 'programming',
        remarkPlugins: [math],
        rehypePlugins: [katex],
        sidebarPath: require.resolve('./sidebars.js'),
      }, 
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/docs/home',
            position: 'left',
            label: 'Tutorial',
          },
          {
            to: '/modeling/home',
            position: 'left',
            label: '数学建模',
          },
          {
            to: '/programming/home',
            position: 'left',
            label: '计算机科学',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/home',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer/themes/palenight'),
        darkTheme: require('prism-react-renderer/themes/oceanicNext'),
        additionalLanguages: ['java'],
      },
    }),
};

module.exports = config;
