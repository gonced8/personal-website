import assert from "node:assert/strict";
import process from "node:process";
import console from "node:console";
import { setTimeout } from "node:timers/promises";
const { fetch, AbortSignal } = globalThis;

const origin = "https://www.goncaloraposo.com";
const commit = process.env.GITHUB_SHA;
assert(commit, "GITHUB_SHA is required for deployment verification");
let published = false;
for (let attempt = 0; attempt < 24; attempt++) {
  try {
    const response = await fetch(`${origin}/build.json?commit=${commit}&attempt=${attempt}`, {
      signal: AbortSignal.timeout(10000),
    });
    if (response.ok && (await response.json()).commit === commit) {
      published = true;
      break;
    }
  } catch {
    /* Pages may still be building. */
  }
  await setTimeout(10000);
}
assert(
  published,
  "Pages has not served this commit yet. Inspect the Pages build and caches before retrying.",
);
for (const route of [
  "/",
  "/pt/",
  "/projects/",
  "/pt/projects/",
  "/writing/",
  "/writing/double-spring-pendulum/",
  "/writing/recovering-a-blurred-image/",
]) {
  const response = await fetch(`${origin}${route}`, { signal: AbortSignal.timeout(10000) });
  assert(response.status === 200, `${route} returned HTTP ${response.status}`);
}
console.log(`Verified published commit ${commit} and primary routes.`);
