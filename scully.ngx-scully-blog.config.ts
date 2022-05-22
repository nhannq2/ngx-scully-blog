/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer'
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import {
  NotionDom,
  NotionDomRouter,
  NotionDomPluginOptions,
  NotionDomRouterPluginOptions
} from '@notion-stuff/scully-plugin-notion';

setPluginConfig(NotionDom, {
  notionBlocksHtmlParserOptions: {
    mdHighlightingOptions: 'prismjs',
  },
} as NotionDomPluginOptions);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'ngx-scully-blog',
  outDir: './dist/static',
  routes: {
    '/blog/:slug': {
      type: NotionDomRouter,
      postRenderers: [NotionDom],
      databaseId: '1711090f063e401fa0840b3ce44a757b',
    } as NotionDomRouterPluginOptions,
  },
};