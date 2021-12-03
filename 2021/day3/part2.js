const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const values = data.split("\n");

const compute1Iterations = (values) => {
  const lineLength = values[0].length;

  return values.reduce(
    (sums, line) =>
      sums.map((sum, index) => sum + parseInt(line.charAt(index), 10)),
    new Array(lineLength).fill(0)
  );
};

const computeRating = (type, values, cursor = 0) => {
  if (values.length === 1) return parseInt(values[0], 2);

  const bitSums = compute1Iterations(values);

  const remainingValues = values.filter((line) => {
    const bitToKeep =
      type === "oxygen"
        ? bitSums[cursor] >= values.length / 2
          ? 1
          : 0
        : bitSums[cursor] >= values.length / 2
        ? 0
        : 1;

    return parseInt(line.charAt(cursor), 10) === bitToKeep;
  });

  return computeRating(type, remainingValues, cursor + 1);
};

const oxygenGeneratorRating = computeRating("oxygen", values);
const co2ScrubberRating = computeRating("co2", values);
const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;

console.log(lifeSupportRating);

