const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const values = data.split("\n");

const lineLength = values[0].length;
const numberOfLines = values.length;

const bitSums = values.reduce(
  (sums, line) =>
    sums.map((sum, index) => sum + parseInt(line.charAt(index), 10)),
  new Array(lineLength).fill(0)
);

const gammaRate = parseInt(
  bitSums.map((bitSum) => (bitSum > numberOfLines / 2 ? 1 : 0)).join(""),
  2
);
const epsilonRate = parseInt(
  bitSums.map((bitSum) => (bitSum > numberOfLines / 2 ? 0 : 1)).join(""),
  2
);
const powerConsumption = gammaRate * epsilonRate;

console.log(powerConsumption);
