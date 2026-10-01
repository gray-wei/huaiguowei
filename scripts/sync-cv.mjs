import { cpSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const sourceDirectory = process.argv[2];
if (!sourceDirectory) {
  console.error("Usage: npm run cv:sync -- /path/to/gray_cv");
  process.exit(1);
}
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(resolve(sourceDirectory), "main.pdf");
// The Chinese CV remains a local draft in gray_cv.
if (readFileSync(source).subarray(0, 5).toString() !== "%PDF-") throw new Error(`Invalid PDF: ${source}`);
cpSync(source, join(root, "assets", "pdf", "cv", "Guowei_Huai_CV.pdf"));
console.log("English CV download synchronized. Rebuild the homepage to preview it.");
