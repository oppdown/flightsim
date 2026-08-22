import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const siteRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
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
  assert.match(html, /src="\/flight-simulator\.html"/);
  assert.match(html, /Changelog/);
  assert.match(html, /Any aircraft-to-ground contact now registers as a landing event\./);
  assert.match(html, /Safe touchdown constraints remain separately graded/);
  assert.match(html, /https:\/\/github\.com\/oppdown\/flightsim/);
  assert.doesNotMatch(html, /Your site is taking shape|codex-preview|SkeletonPreview/);
});

test("the public site keeps the simulator asset and source history", async () => {
  const [page, layout, packageJson, changelog] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../../CHANGELOG.md", import.meta.url), "utf8"),
  ]);

  await access(new URL("../public/flight-simulator.html", import.meta.url));
  assert.match(page, /id="changelog"/);
  assert.match(page, /src="\/flight-simulator\.html"/);
  assert.match(layout, /Flight Lab · Takeoff & Landing Trainer/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|WRANGLER_LOG_PATH/);
  assert.match(changelog, /Register any aircraft-to-ground contact as a landing event/);
});
