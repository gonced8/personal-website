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
