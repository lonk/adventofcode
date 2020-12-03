const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

let nbTrees = 0;
let x = 0;

for (const line of lines) {
  if (line.charAt(x) === "#") nbTrees += 1;

  x = (x + 3) % line.length;
}

console.log(nbTrees);
