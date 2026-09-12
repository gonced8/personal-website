import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import process from "node:process";
import localAssets from "./src/plugins/local-assets.mjs";
import { unified } from "@astrojs/markdown-remark";

export default defineConfig({
  site: "https://www.goncaloraposo.com",
  base: process.env.SITE_BASE || "/",
  output: "static",
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", { path: "pt", codes: ["pt-PT"] }],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  markdown: {
    processor: unified({ rehypePlugins: [localAssets] }),
    shikiConfig: { themes: { light: "github-light", dark: "github-dark" } },
  },
});
