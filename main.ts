import { writeFileSync, mkdirSync } from "node:fs";

const LINE =
  "One percent. The low battery warning was never a warning \u2014 it was me crying for help for years.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

if (LINE.length < 1 || LINE.length > 199 || LINE.trim().length === 0) {
  throw new Error(`entry fails gate: ${LINE.length} chars`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
const byteLen = Buffer.byteLength(LINE, "utf8");
if (byteLen > 199 + 2) {
  throw new Error(`entry too long in bytes: ${byteLen}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
