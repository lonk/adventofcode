const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const joltageRatings = data.split("\n").map((number) => parseInt(number, 10));

const sortedJoltageRatings = joltageRatings.slice().sort((a, b) => a - b);

const computeResult = () => {
  let oneJoltDifferencesCount = 0;
  let twoJoltDifferencesCount = 0;
  let threeJoltDifferencesCount = 1;
  let previousJoltage = 0;

  for (const joltage of sortedJoltageRatings) {
    switch (joltage - previousJoltage) {
      case 1:
        oneJoltDifferencesCount += 1;
        break;
      case 2:
        twoJoltDifferencesCount += 1;
        break;
      case 3:
        threeJoltDifferencesCount += 1;
        break;
      default:
        throw new Error("Can't use all adapters.");
    }

    previousJoltage = joltage;
  }

  return oneJoltDifferencesCount * threeJoltDifferencesCount;
};

console.log(computeResult());
