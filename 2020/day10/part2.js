const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const joltageRatings = data.split("\n").map((number) => parseInt(number, 10));

const sortedJoltageRatings = joltageRatings.slice().sort((a, b) => a - b);
const possibleArrangementsByRatings = new Map(
  sortedJoltageRatings.map((entry) => [entry, null])
);

const getPossibleArrangements = (acc, step) => {
  const storedArrangements = possibleArrangementsByRatings.get(step);
  if (!storedArrangements) {
    const computedArrangements = computeResult(step);
    possibleArrangementsByRatings.set(step, computedArrangements);

    return acc + computedArrangements;
  }

  return acc + storedArrangements;
};

const computeResult = (currentStep) => {
  const nextSteps = [];

  for (let i = currentStep + 1; i <= currentStep + 3; i++) {
    if (possibleArrangementsByRatings.has(i)) nextSteps.push(i);
  }

  if (nextSteps.length === 0) return 1;

  return nextSteps.reduce(getPossibleArrangements, 0);
};

console.log(computeResult(0));
