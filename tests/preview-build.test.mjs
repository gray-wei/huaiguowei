import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
execFileSync(process.execPath, ["scripts/build-preview.mjs"], { cwd: root, stdio: "pipe" });
const output = join(root, "_site");
const pages = ["index.html", "projects/teleoperation/index.html"];
const home = readFileSync(join(output, pages[0]), "utf8");

test("publishes current academic identity and complete HiFun information", () => {
  assert.match(home, /PhD student in Robotics and Autonomous Systems/);
  assert.match(home, /mailto:ghuai073@connect\.hkust-gz\.edu\.cn/);
  assert.match(home, /HiFun: A Hierarchical Framework for Efficient Functional Dexterous Manipulation Learning/);
  assert.match(home, /Linyi Huang<\/a>, <a[^>]+><strong>Guowei Huai<\/strong><\/a>, <a[^>]+>Weibin Liu<\/a>, <a[^>]+>Shulong Jiang<\/a>, <a[^>]+>Ping Tan<\/a>, <a[^>]+>Weixuan Zhang<\/a>/);
  assert.match(home, /98\.3%/);
  assert.match(home, /60 min of online human-in-the-loop training/);
  assert.match(home, /full pipeline averages approximately 109 min/);
  assert.match(home, /https:\/\/hly-123\.github\.io\/HiFun\/assets\/documents\/hifun-corl2026\.pdf/);
  assert.ok(home.indexOf('id="publications"') < home.indexOf('id="projects"'));
  assert.ok(home.indexOf('id="service"') < home.indexOf('id="honors"'));
  assert.doesNotMatch(home, /Code coming soon/);
  assert.doesNotMatch(home, /href="#"|href=""|arXiv|Google Scholar|Goal-Conditioned In-Hand Rotation/);
});

test("every local page link, anchor and media reference resolves", () => {
  for (const relative of pages) {
    const html = readFileSync(join(output, relative), "utf8");
    const base = new URL(relative, "https://preview.example/huaiguowei/");
    for (const [, raw] of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
      const url = new URL(raw.replaceAll("&amp;", "&"), base);
      if (url.origin !== base.origin) continue;
      assert.ok(url.pathname.startsWith("/huaiguowei/"), `Escapes GitHub Pages project path: ${raw}`);
      let path = join(output, decodeURIComponent(url.pathname.slice("/huaiguowei/".length)));
      if (url.pathname.endsWith("/")) path = join(path, "index.html");
      assert.ok(statSync(path).isFile(), `Missing ${raw} in ${relative}`);
      if (url.hash) assert.ok(readFileSync(path, "utf8").includes(`id="${url.hash.slice(1)}"`), `Missing anchor ${raw}`);
    }
  }
});

test("original HiFun overview and compact project demos have controls and posters", () => {
  assert.equal([...home.matchAll(/<video\b/g)].length, 4);
  assert.doesNotMatch(home, /\bautoplay\b/); // JavaScript starts visible demos, rather than every video at page load.
  for (const [, attributes] of home.matchAll(/<video\b([^>]+)>/g)) {
    assert.match(attributes, /\bcontrols\b/);
    assert.match(attributes, /\bmuted\b/);
    assert.match(attributes, /\bloop\b/);
    assert.match(attributes, /preload="(?:none|metadata)"/);
    assert.match(attributes, /poster="assets\/img\/research\//);
    assert.match(attributes, /aria-label="[^"]+"/);
  }
  const publicationHtml = home.slice(home.indexOf('id="publications"'), home.indexOf('id="projects"'));
  assert.match(publicationHtml, /src="assets\/video\/research\/hifun-overview\.mp4"/);
  assert.match(publicationHtml, /poster="assets\/img\/research\/hifun-overview\.webp"/);
  assert.match(publicationHtml, /preload="none"/);
  const overviewAttributes = /<video\b([^>]+)>/.exec(publicationHtml)[1];
  assert.match(overviewAttributes, /\bmuted\b.*\bloop\b/);
  const overview = statSync(join(output, "assets/video/research/hifun-overview.mp4"));
  assert.ok(overview.size > 20_000_000 && overview.size < 30_000_000, "Use the full project overview video");
  for (const name of ["mobile", "rdt"]) {
    assert.ok(statSync(join(output, `assets/video/research/${name}-teaser.mp4`)).size < 1_000_000);
  }
});

test("English CV download and the full teleoperation demo are included", () => {
  for (const name of ["Guowei_Huai_CV.pdf"]) {
    const relative = `assets/pdf/cv/${name}`;
    assert.match(home, new RegExp(name.replaceAll(".", "\\.")));
    assert.deepEqual(readFileSync(join(output, relative)), readFileSync(join(root, relative)));
  }
  assert.doesNotMatch(home, /Guowei_Huai_CV_ZH|CV · 中文/);
  assert.equal(existsSync(join(output, "assets/pdf/cv/Guowei_Huai_CV_ZH.pdf")), false, "The Chinese draft stays local");
  const page = readFileSync(join(output, pages[1]), "utf8");
  assert.match(page, /Manus retargeting and a unified interface/);
  assert.match(page, /My contribution/);
  assert.match(page, /\.\.\/\.\.\/assets\/video\/research\/teleop-preview\.mp4/);
});
