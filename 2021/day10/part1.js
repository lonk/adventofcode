const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");
const chunkStart = new Set(['<', '{', '(', '[']);
const matchingChunks = new Map([
    ['<', '>'],
    ['(', ')'],
    ['{', '}'],
    ['[', ']']
]);
const pointsByCharacters = new Map([
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137]
]);

let points = 0;

for (const line of lines) {
    const characters = line.split('');
    const stack = [];

    for (const character of characters) {
        if (chunkStart.has(character)) {
            stack.push(character);
            continue;
        }

        const lastChunkOpening = stack.pop();

        if (matchingChunks.get(lastChunkOpening) !== character) {
            points += pointsByCharacters.get(character);
            break;
        }
    }
}

console.log(points);
