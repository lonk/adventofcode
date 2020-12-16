const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const groups = data.split("\n\n");

const rules = groups[0].split("\n");

const validNumbers = new Set(
  rules.flatMap((rule) => {
    const ranges = [...rule.matchAll(/(\d+)-(\d+) or (\d+)-(\d+)/g)][0];
    const validNumbers = [];

    const start1 = parseInt(ranges[1], 10);
    const stop1 = parseInt(ranges[2], 10);
    const start2 = parseInt(ranges[3], 10);
    const stop2 = parseInt(ranges[4], 10);

    for (let index = start1; index <= stop1; index += 1) {
      validNumbers.push(index);
    }
    for (let index = start2; index <= stop2; index += 1) {
      validNumbers.push(index);
    }

    return validNumbers;
  })
);

const nearbyTickets = groups[2].split("\n");
nearbyTickets.shift();
const numbersToCheck = nearbyTickets
  .join(",")
  .split(",")
  .map((strNumber) => parseInt(strNumber, 0));

const answer = numbersToCheck.reduce(
  (acc, number) => (validNumbers.has(number) ? acc : acc + number),
  0
);

console.log(answer);
