import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";

const legacyPaths = [
  "_bibliography",
  "_books",
  "_data",
  "_includes",
  "_layouts",
  "_news",
  "_pages",
  "_plugins",
  "_posts",
  "_projects",
  "_sass",
  "_scripts",
  "_teachings",
  "_config.yml",
  "Gemfile",
  "Dockerfile",
  "docker-compose.yml",
  "docker-compose-slim.yml",
  "purgecss.config.js",
  "requirements.txt",
  "bin",
  "docs",
  "assets/css",
  "assets/fonts",
  "assets/js",
  "assets/json",
  "assets/rendercv",
  "assets/webfonts",
  ".all-contributorsrc",
  ".devcontainer",
  ".dockerignore",
  ".gemini",
  ".git-blame-ignore-revs",
  ".gitattributes",
  ".github/agents",
  ".github/instructions",
  ".github/copilot-instructions.md",
  ".lycheeignore",
  ".pre-commit-config.yaml",
  "robots.txt",
];

test("repository excludes legacy Jekyll and al-folio files", () => {
  const remaining = legacyPaths.filter((path) => existsSync(new URL(`../${path}`, import.meta.url)));

  assert.deepEqual(remaining, []);
});
