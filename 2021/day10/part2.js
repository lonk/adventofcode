const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");
const chunkStart = new Set(["<", "{", "(", "["]);
const matchingChunks = new Map([
  ["<", ">"],
  ["(", ")"],
  ["{", "}"],
  ["[", "]"],
]);
const pointsByCharacters = new Map([
  ["(", 1],
  ["[", 2],
  ["{", 3],
  ["<", 4],
]);

const scores = [];

for (const line of lines) {
  const characters = line.split("");
  const stack = [];
  let illegal = false;

  for (const character of characters) {
    if (chunkStart.has(character)) {
      stack.push(character);
      continue;
    }

    const lastChunkOpening = stack.pop();

    if (matchingChunks.get(lastChunkOpening) !== character) {
      illegal = true;
      break;
    }
  }

  if (illegal) continue;

  const score = stack
    .reverse()
    .reduce(
      (score, character) => score * 5 + pointsByCharacters.get(character),
      0
    );

  scores.push(score);
}


console.log(scores.sort((a, b) => b - a)[Math.floor(scores.length / 2)]);
