// import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';
// import { getHttp404Plugin } from "@gammastream/scully-plugin-http404";
import {
  NotionDom,
  NotionDomPluginOptions,
  NotionDomRouter,
  NotionDomRouterPluginOptions,
} from "@notion-stuff/scully-plugin-notion";
import "@notiz/scully-plugin-lazy-images";
import { ScullyConfig, setPluginConfig } from "@scullyio/scully";
import "@scullyio/scully-plugin-puppeteer";
// import { MinifyHtml } from "scully-plugin-minify-html";
import { timeToRead, timeToReadOptions } from "scully-plugin-time-to-read";

setPluginConfig(NotionDom, {
  notionBlocksHtmlParserOptions: {
    mdHighlightingOptions: "prismjs",
  },
} as NotionDomPluginOptions);

setPluginConfig(timeToRead, {
  path: "/blog",
} as timeToReadOptions);

// sitemap
// const SitemapPlugin = getSitemapPlugin();
// setPluginConfig(SitemapPlugin, {
//   // TODO: Update this urlPrefix to your domain
//   urlPrefix: 'https://nhannguyen.me/blog',
//   sitemapFilename: 'sitemap.xml',
//   changeFreq: 'monthly',
//   priority: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'],
//   ignoredRoutes: ['/404'],
//   trailingSlash: true,
// });

// code highlight
// setPluginConfig('md', { enableSyntaxHighlighting: true });

// scully config
// export const config: ScullyConfig = {
//   projectRoot: "./src",
//   projectName: "ngx-scully-blog",
//   outDir: './dist/static',
//   routes: {
//     '/blog/:slug': {
//       type: 'contentFolder',
//       slug: {
//         folder: "./blog"
//       },
//     },
//   }
// };
export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "ngx-scully-blog",
  outDir: "./dist/static",
  // defaultPostRenderers: [
  //   MinifyHtml,
  //   getHttp404Plugin(),
  //   "seoHrefOptimise",
  //   "lazyImages",
  // ],
  routes: {
    "/blog/:slug": {
      type: NotionDomRouter,
      postRenderers: [NotionDom],
      databaseId: "03771c044523415680552be9db67c777",
    } as NotionDomRouterPluginOptions,
  },
};
