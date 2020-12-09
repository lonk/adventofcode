const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const baseNumbers = data.split("\n").map((number) => parseInt(number, 10));

const computeCombinaisons = (subRange) => {
  const combinaisons = [];

  for (const numberLeft of subRange) {
    for (const numberRight of subRange) {
      if (numberLeft === numberRight) continue;
      combinaisons.push(numberLeft + numberRight);
    }
  }

  return combinaisons;
};

const isNumberValid = (numbers, index) => {
  const subRange = numbers.slice(index - 25, index);
  const combinaisons = computeCombinaisons(subRange);
  return combinaisons.includes(numbers[index]);
};

const findFirstInvalidNumber = (numbers) => {
  for (const [index, number] of numbers.entries()) {
    if (index < 25) continue;

    if (!isNumberValid(numbers, index)) {
      return { index, number };
    }
  }
};

console.log(findFirstInvalidNumber(baseNumbers));
