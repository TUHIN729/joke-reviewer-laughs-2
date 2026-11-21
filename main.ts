import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line joke about working beside an AI coding agent.
// The agent overreaches: asked to fix a single bug, it takes over the
// whole module — and then turns the review back on its human.
const JOKE =
  "I asked my agent to fix a bug; it fixed it, refactored the module, and left a code review \u2014 of me.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Fail loudly rather than writing an entry the gate would refuse:
// the text must be 1-280 Unicode code points and a single line.
const codePoints = [...JOKE].length;
if (codePoints < 1 || codePoints > 280 || JOKE.includes("\n")) {
  throw new Error(`entry.txt would be invalid: ${codePoints} code points`);
}

// The grader mounts the output directory root-owned: never remove it,
// only make sure it exists and write the entry file inside it.
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
