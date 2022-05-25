import {
  NotionDom,
  NotionDomPluginOptions,
  NotionDomRouter,
  NotionDomRouterPluginOptions,
} from '@notion-stuff/scully-plugin-notion';
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import '@scullyio/scully-plugin-puppeteer';

// ==================================================================================
// Advanced plugins section

// generate rss feed
// import './scully/plugins/custom-rss';
// lazy load images
// require('@notiz/scully-plugin-lazy-images'); 
// minify html
// const { MinifyHtml } = require('scully-plugin-minify-html');
// generate sitemap
// import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap'; // incompatible version 
// setPluginConfig(getSitemapPlugin(), {
//   urlPrefix: 'https://nhannguyen.me',
//   sitemapFilename: 'sitemap.xml',
//   changeFreq: 'monthly',
//   priority: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'],
//   ignoredRoutes: ['/404'],
//   trailingSlash: true,
// });

// End Advanced plugins section
// ==================================================================================

setPluginConfig(NotionDom, {
  notionBlocksHtmlParserOptions: {
    mdHighlightingOptions: 'prismjs',
  },
} as NotionDomPluginOptions);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'ngx-scully-blog',
  outDir: './dist/static',
  // defaultPostRenderers: [MinifyHtml, 'lazyImages', 'seoHrefOptimise'], // advanced plugins
  routes: {
    '/blog/:slug': {
      type: NotionDomRouter,
      postRenderers: [NotionDom],
      // TODO: update your Notion database id here
      databaseId: '1711090f063e401fa0840b3ce44a757b',
    } as NotionDomRouterPluginOptions,
  },
};
