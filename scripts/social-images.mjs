import { readdir, readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { Buffer } from "node:buffer";
import { URL } from "node:url";
const escape = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== "social") await walk(file);
    if (!entry.isFile() || !entry.name.endsWith(".html")) continue;
    const html = await readFile(file, "utf8");
    const title =
      html.match(/<title>(.*?)<\/title>/)?.[1]?.replace(/ — Gonçalo Raposo$/, "") ??
      "Gonçalo Raposo";
    const url = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    if (!url) continue;
    const lines = [""];
    for (const word of title.split(/\s+/)) {
      if ((lines.at(-1) + word).length > 29) lines.push("");
      lines[lines.length - 1] += `${word} `;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f8f8f4"/><path d="M80 86h64" stroke="#245f55" stroke-width="5"/><text x="80" y="145" font-family="DejaVu Sans,sans-serif" font-size="24" fill="#245f55">GONÇALO RAPOSO · SOFTWARE ENGINEER</text>${lines
      .slice(0, 5)
      .map(
        (line, i) =>
          `<text x="80" y="${235 + i * 66}" font-family="DejaVu Sans,sans-serif" font-size="52" fill="#191b1a">${escape(line)}</text>`,
      )
      .join(
        "",
      )}<text x="80" y="580" font-family="DejaVu Sans,sans-serif" font-size="22" fill="#626762">goncaloraposo.com</text></svg>`;
    const output = path.join("dist", new URL(url).pathname);
    await mkdir(path.dirname(output), { recursive: true });
    await sharp(Buffer.from(svg)).png().toFile(output);
  }
}
await walk("dist");
