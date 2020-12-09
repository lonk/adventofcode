const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const baseNumbers = data.split("\n").map((number) => parseInt(number, 10));

const firstInvalidNumber = 36845998;

const findRangeStartingAtIndex = (numbers, index, sumToFind) => {
  const subArray = numbers.slice().splice(index + 1, numbers.length - 1);
  let sum = 0;
  for (const number of subArray) {
    sum += number;

    if (sum === sumToFind) return subArray[0] + number;
    else if (sum > sumToFind) return false;
  }

  return false;
};

const findValidRange = (numbers, sumToFind) => {
  for (const [index, number] of numbers.entries()) {
    if (number > firstInvalidNumber) continue;

    const result = findRangeStartingAtIndex(numbers, index, sumToFind);

    if (result) return result;
  }

  return false;
};

console.log(findValidRange(baseNumbers, firstInvalidNumber));
