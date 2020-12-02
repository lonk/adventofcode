const { readFileSync } = require("fs");

const data = readFileSync("puzzle2.data", { encoding: "utf-8" });

const lines = data.split("\n");

let validPasswordsCount = 0;
for (const line of lines) {
  const found = [...line.matchAll(/(\d+)-(\d+) (\w): (\w+)/g)][0];
  const minValue = parseInt(found[1], 10);
  const maxValue = parseInt(found[2], 10);
  const letterToCheck = found[3];
  const password = found[4].split("");
  const nbTimesLetterInPassword = password.filter(
    (letter) => letter === letterToCheck
  ).length;

  if (
    nbTimesLetterInPassword >= minValue &&
    nbTimesLetterInPassword <= maxValue
  ) {
    validPasswordsCount++;
  }
}

console.log(validPasswordsCount);
