import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import process from "node:process";

export default defineConfig({
  site: "https://goncaloraposo.com",
  base: process.env.SITE_BASE || "/",
  output: "static",
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt-PT"],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
});
