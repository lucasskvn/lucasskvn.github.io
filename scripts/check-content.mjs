import fs from "node:fs";
import assert from "node:assert/strict";
const source = fs.readFileSync(
  new URL("../src/data/projects.ts", import.meta.url),
  "utf8",
);
const imports = [...source.matchAll(/from ["'](\.\.\/assets\/[^"']+)["']/g)].map(
  (match) => match[1],
);
assert.equal(imports.length, 30, "All 30 original project asset imports must remain present.");
for (const asset of imports)
  assert.ok(
    fs.existsSync(new URL(`../src/data/${asset}`, import.meta.url)),
    `Missing original asset: ${asset}`,
  );
assert.ok(
  fs.existsSync(new URL("../public/CV_LucasSangkhavongs.pdf", import.meta.url)),
  "The original CV must be preserved.",
);
console.log(`Verified ${imports.length} original asset references and the CV.`);
