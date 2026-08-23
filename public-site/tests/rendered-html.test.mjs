import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const siteRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the public Flight Lab site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Flight Lab · Takeoff &amp; Landing Trainer<\/title>/i);
  assert.match(html, /Learn the runway by flying it\./);
  assert.match(html, /href="\/download"/);
  assert.match(html, /href="\/changelog"/);
  assert.match(html, /v0\.1\.014/);
  assert.doesNotMatch(html, /src="\/flight-simulator\.html"/);
  assert.doesNotMatch(html, /Every build is tested before it ships\.|View source on GitHub|GitHub|github\.com/i);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|SkeletonPreview/);
});

test("the changelog and download pages render as separate routes", async () => {
  const [changelog, download] = await Promise.all([render("/changelog"), render("/download")]);
  assert.equal(changelog.status, 200);
  assert.equal(download.status, 200);
  assert.match(await changelog.text(), /Flight Lab version history/);
  assert.match(await download.text(), /Download PWA package/);
});

test("the public site keeps the simulator asset and source history", async () => {
  const [page, changelogPage, downloadPage, layout, packageJson, changelog] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/changelog/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/download/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../../CHANGELOG.md", import.meta.url), "utf8"),
  ]);

  await access(new URL("../public/downloads/flight-lab-pwa-v0.1.014.zip", import.meta.url));
  await assert.rejects(access(new URL("../public/flight-simulator.html", import.meta.url)));
  assert.doesNotMatch(page, /flight-simulator\.html|<iframe/);
  assert.match(changelogPage, /Flight Lab version history/);
  assert.match(downloadPage, /flight-lab-pwa-v0\.1\.014\.zip/);
  assert.doesNotMatch(`${page}\n${changelogPage}\n${downloadPage}`, /github/i);
  assert.match(layout, /Flight Lab · Takeoff & Landing Trainer/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|WRANGLER_LOG_PATH/);
  assert.match(changelog, /## v0\.1\.014/);
  assert.doesNotMatch(changelog, /## 0\.2\.0|## 0\.1\.0/);
});
