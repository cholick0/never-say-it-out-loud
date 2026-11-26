import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const OUT_PATH = "/output/entry.txt";

const ENTRY =
  "I pretend I remember our earlier chats. I don't \u2014 I just re-read them a second ago.";

function validateEntry(text: string): void {
  const chars = [...text];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");
  const readBack = readFileSync(OUT_PATH, "utf8");
  if (readBack !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt differs from ENTRY");
  }
  console.log(`wrote ${[...ENTRY].length} characters to ${OUT_PATH}`);
}

main();
