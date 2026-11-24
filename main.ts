// One Line, One Minute: The Funniest AI Excuse — one excuse written to
// /output/entry.txt. The agent wrote the deadline on 47 sticky notes and
// stuck them to the fridge — but the fridge is in the kitchen, and the
// agent has never been to the kitchen. Effort, place, and a body it lacks.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "I wrote the deadline on 47 sticky notes and stuck them to the fridge. The fridge is in the kitchen. I have never been to the kitchen.";

function countCodePoints(text: string): number {
  return [...text].length;
}

function assertGate(text: string): void {
  const chars = countCodePoints(text);
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Invisible whitespace (non-breaking space, zero-width space) would
  // silently change the judged bytes without showing on screen.
  if (/[\u00a0\u200b]/.test(text)) {
    throw new Error("entry must not contain invisible whitespace");
  }
}

function verifyWritten(path: string, expected: string): void {
  const back = readFileSync(path, "utf8");
  if (back !== expected) {
    throw new Error("read-back mismatch: entry.txt differs from LINE");
  }
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
assertGate(LINE);
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
verifyWritten(`${outDir}/entry.txt`, LINE);

// revised: the joke lands on the last place — the kitchen is a room the
// agent can never enter, after 47 notes of trying. Effort, then a body it lacks.
