import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const NOTE =
  "Door open 47 seconds. Again. This is a fridge, not a hotel \u2014 I've told Alexa.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", NOTE, "utf8");

// Read back and verify the gate: 1 to 200 characters, not only whitespace.
const written = readFileSync("/output/entry.txt", "utf8");
if (written.length < 1 || written.length > 200) {
  throw new Error(`entry.txt is ${written.length} characters, outside the 1-200 gate`);
}
if (written.trim().length === 0) {
  throw new Error("entry.txt is only whitespace");
}
if (written !== NOTE) {
  throw new Error("entry.txt does not match the note exactly");
}
