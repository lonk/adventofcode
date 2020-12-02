const { readFileSync } = require("fs");

const data = readFileSync("puzzle2.data", { encoding: "utf-8" });

const lines = data.split("\n");

let validPasswordsCount = 0;
for (const line of lines) {
  const found = [...line.matchAll(/(\d+)-(\d+) (\w): (\w+)/g)][0];
  const firstIndex = parseInt(found[1], 10) - 1;
  const secondIndex = parseInt(found[2], 10) - 1;
  const letterToCheck = found[3];
  const password = found[4].split("");

  if (
    (password[firstIndex] === letterToCheck &&
      password[secondIndex] !== letterToCheck) ||
    (password[firstIndex] !== letterToCheck &&
      password[secondIndex] === letterToCheck)
  ) {
    validPasswordsCount++;
  }
}

console.log(validPasswordsCount);
