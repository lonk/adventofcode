const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const joltageRatings = data.split("\n").map((number) => parseInt(number, 10));

const sortedJoltageRatings = joltageRatings.slice().sort((a, b) => a - b);
const joltages = new Set(sortedJoltageRatings);

const computeResult = () => {
  const memory = [0, 0, 1];

  for (
    let joltage = 1;
    joltage <= sortedJoltageRatings[sortedJoltageRatings.length - 1];
    joltage++
  ) {
    const sum = joltages.has(joltage) ? memory[0] + memory[1] + memory[2] : 0;
    memory.shift();
    memory.push(sum);
  }

  return memory.pop();
};

console.log(computeResult());
