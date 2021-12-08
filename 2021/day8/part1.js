const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const entries = data.split("\n");

const result = entries.reduce((acc, entry) => {
  const [_, output] = entry.split(" | ");
  const digits = output.split(" ");

  const uniqueDigits = digits.filter(
    (digit) =>
      digit.length === 2 ||
      digit.length === 3 ||
      digit.length === 4 ||
      digit.length === 7
  ).length;

  return acc + uniqueDigits;
}, 0);

console.log(result);
