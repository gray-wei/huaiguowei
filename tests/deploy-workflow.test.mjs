import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("GitHub Pages deploy uses the npm static preview build", () => {
  const workflow = readFileSync(new URL("../.github/workflows/deploy.yml", import.meta.url), "utf8");

  assert.match(workflow, /actions\/setup-node@v4/);
  assert.match(workflow, /npm run test:preview/);
  assert.doesNotMatch(workflow, /bundle exec jekyll build/);
  assert.doesNotMatch(workflow, /purgecss -c purgecss\.config\.js/);
  assert.match(workflow, /folder: _site/);
  assert.match(workflow, /"package\*\.json"/);
});
