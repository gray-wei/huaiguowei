import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";

test("builds a reviewable static homepage preview", () => {
  execFileSync(process.execPath, ["scripts/build-preview.mjs"], {
    cwd: new URL("..", import.meta.url),
    stdio: "pipe",
  });

  const htmlPath = new URL("../_site/index.html", import.meta.url);
  const cssPath = new URL("../_site/assets/preview.css", import.meta.url);
  const html = readFileSync(htmlPath, "utf8");

  assert.match(html, /Guowei HUAI/);
  assert.match(html, /Dexterous Manipulation/);
  assert.match(html, /<main class="page-shell"/);
  assert.match(html, /class="focus-strip"/);
  assert.match(html, /class="name-mark"/);
  assert.match(html, /<section id="research"/);
  assert.match(html, /<div class="paper-list">/);
  assert.match(html, /<video class="research-video"/);
  assert.match(html, /assets\/video\/research\/hifun-preview\.mp4/);
  assert.match(html, /class="media-pattern"/);
  assert.match(html, /class="motion-rail"/);
  assert.match(html, /<section id="publications"/);
  assert.match(html, /HiFun/);
  assert.match(html, /Goal-Conditioned In-Hand Rotation/);
  assert.match(html, /Dexterous Teleoperation and Multimodal Data Platform/);
  assert.match(html, /assets\/pdf\/cv\/Guowei_Huai_CV\.pdf/);
  assert.match(html, /CoRL 2026 under review/);
  assert.doesNotMatch(html, /Project structure preview/);
  assert.doesNotMatch(html, /Recent updates/);
  assert.doesNotMatch(html, /first version of this homepage/i);
  assert.doesNotMatch(html, /class="site-header"/);
  assert.ok(statSync(cssPath).isFile());
});
