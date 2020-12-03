const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const computeNbTrees = (slopeX, slopeY) => {
  let nbTrees = 0;
  let x = 0;

  for (let y = 0; y < lines.length; y += slopeY) {
    const line = lines[y];

    if (line.charAt(x) === "#") nbTrees += 1;

    x = (x + slopeX) % line.length;
  }

  return nbTrees;
};

const answer =
  computeNbTrees(1, 1) *
  computeNbTrees(3, 1) *
  computeNbTrees(5, 1) *
  computeNbTrees(7, 1) *
  computeNbTrees(1, 2);

console.log(answer);
