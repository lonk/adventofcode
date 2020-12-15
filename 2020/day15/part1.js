const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const startingNumbers = data.split(",").map((number) => parseInt(number, 10));

const lastTimeSpoken = new Map(
  startingNumbers.map((number, index) => [number, index + 1])
);

let lastNumberSpoken = startingNumbers[startingNumbers.length - 1];
for (let turn = lastTimeSpoken.size + 1; turn <= 2020; turn += 1) {
  const lastNumberHasBeenSpokenAt = lastTimeSpoken.get(lastNumberSpoken) || -1;
  lastTimeSpoken.set(lastNumberSpoken, turn - 1);

  lastNumberSpoken =
    lastNumberHasBeenSpokenAt > -1 ? turn - 1 - lastNumberHasBeenSpokenAt : 0;
}

console.log(lastNumberSpoken);
