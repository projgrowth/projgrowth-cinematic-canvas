#!/usr/bin/env node
/**
 * Design-token guardrail.
 * Fails (exit 1) if any file under src/ (excluding rgc.css and Discovery inline styles)
 * introduces hardcoded colors or non-standard radii that bypass the design system.
 *
 * Usage: node scripts/check-tokens.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = new URL("../src", import.meta.url).pathname;

// Files where inline styles are the point (dark-theme wizard preview).
const IGNORE_FILES = new Set([
  "pages/rgc.css",
  "pages/RGC.tsx",
  "pages/Discovery.tsx",
  "pages/discovery/primitives.tsx",
  "pages/discovery/steps.tsx",
  "pages/discovery/constants.ts",
  "pages/discovery/mockups",
  "pages/discovery/Shell.tsx",
  "pages/discovery/brandBriefPdf.ts",
  "components/pitch",
]);

const RULES = [
  {
    id: "hardcoded-hex",
    re: /#[0-9a-fA-F]{3,8}\b/g,
    // Allow token declarations inside CSS files.
    allowIn: (path) => path.endsWith("index.css"),
  },
  {
    id: "raw-hsl-literal",
    // hsl(120 30% 50%) or hsla(...) with numeric literals, but NOT hsl(var(--...)).
    re: /\bhsla?\(\s*\d/g,
    allowIn: (path) => path.endsWith("index.css") || path.endsWith("tailwind.config.ts"),
  },
  {
    id: "bubbly-radius",
    re: /\brounded-(xl|2xl|3xl)\b/g,
    allowIn: () => false,
  },
];

const violations = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    const rel = relative(ROOT, abs).replaceAll("\\", "/");
    if ([...IGNORE_FILES].some((ig) => rel === ig || rel.startsWith(`${ig}/`))) continue;
    const s = statSync(abs);
    if (s.isDirectory()) { walk(abs); continue; }
    const ext = extname(abs);
    if (![".ts", ".tsx", ".css"].includes(ext)) continue;
    const src = readFileSync(abs, "utf8");
    for (const rule of RULES) {
      if (rule.allowIn(rel)) continue;
      const lines = src.split("\n");
      lines.forEach((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith("//") || trimmed.startsWith("*")) return;
        const matches = line.match(rule.re);
        if (matches) {
          for (const m of matches) {
            violations.push({ file: rel, line: i + 1, rule: rule.id, match: m });
          }
        }
      });
    }
  }
}

walk(ROOT);

if (violations.length) {
  console.error(`\n[check-tokens] ${violations.length} violation(s):\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  [${v.rule}]  ${v.match}`);
  }
  console.error(`\nUse semantic tokens from src/index.css (e.g. hsl(var(--accent)), text-accent, rounded-lg).`);
  process.exit(1);
}

console.log("[check-tokens] Clean — no hardcoded tokens found.");