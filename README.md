# goncaloraposo.com

The personal site of Gonçalo Raposo, built as a static Astro site with TypeScript and CSS.

## Development

```sh
npm ci
npm run dev
```

Useful checks:

```sh
npm run format:check
npm run lint
npm run check
npm run build
```

Writing lives in `src/content/writing/`; projects and publications are explicit, versioned data in `src/data/`. Production is deployed to GitHub Pages from `main`; pull requests receive isolated previews under `/pr-preview/pr-<number>/`.

## Editorial maintenance

- Add projects in `src/data/projects.ts`, with a stable `id`, EN/PT copy and an explicit `featuredOrder` for selected work. Screenshots belong in `src/assets/projects/`; Astro generates responsive WebP images. A fork is not automatically a contribution.
- Add articles as Markdown in the appropriate language folder. `translationKey` relates real translations; untranslated articles link to the other writing index without advertising it as a translation. `projectId` optionally links an article to its project. Drafts are excluded from all production routes and indexes.
- Keep article images in `public/writing/`, referencing `/writing/filename`. The Markdown processor adds intrinsic dimensions and the preview base path. GIFs need a sibling `-poster.png`; they start still and play only after interaction. Original migration sources are recorded in `docs/writing-images.json`.
- Historical articles preserve the original text and date. Current clarifications belong in a separately labelled note, with an `updated` date.
- Private work uses fictional illustrative data, never a screenshot or link revealing a person's identity.

`npm run build` also generates local PNG social images from page titles. `npm run verify:build` checks every internal link and image. For previews, use the same `SITE_BASE=/pr-preview/pr-123/` for both commands. `npm test` runs Chromium accessibility, layout, theme and language checks (install Chromium once with `npx playwright install chromium`).

See [deployment notes](docs/deployment.md) for Pages configuration and the Cloudflare apex redirect. Production hostname: `www.goncaloraposo.com`.
