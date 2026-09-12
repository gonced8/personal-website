import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import console from "node:console";
const base = (process.env.SITE_BASE || "/").replace(/\/$/, "");
let count = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(file);
      continue;
    }
    if (!file.endsWith(".html")) continue;
    const html = await readFile(file, "utf8");
    count++;
    assert(!html.includes("PhD Student and Researcher"), `Legacy identity in ${file}`);
    if (base) assert(html.includes('content="noindex, follow"'), `Preview indexed: ${file}`);
    for (const match of html.matchAll(/(?:href|src|poster|data-animation)="(\/(?!\/)[^"#?]*)/g)) {
      const url = match[1];
      assert(!base || url.startsWith(`${base}/`), `Escaped preview: ${url} in ${file}`);
      const relative = decodeURIComponent(url.slice(base.length));
      const target = path.join("dist", relative.endsWith("/") ? `${relative}index.html` : relative);
      assert(await stat(target).catch(() => false), `Missing ${url} in ${file}`);
    }
  }
}
await walk("dist");
console.log(`Verified internal assets and links across ${count} pages (${base || "/"}).`);
