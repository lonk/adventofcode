const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const values = data.split("\n").map(entry => parseInt(entry, 10));

const amountOfIncrease = values.reduce((acc, value, index) => {
    if (index === 0 || index > values.length - 3) return acc;

    const previousSum = values[index - 1] + value + values[index + 1];
    const currentSum = value + values[index + 1] + values[index + 2];

    if (previousSum < currentSum) return acc + 1;

    return acc;
}, 0);

console.log(amountOfIncrease);
