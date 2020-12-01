const { readFileSync } = require("fs");

const data = readFileSync("puzzle1.data", { encoding: "utf-8" });

const values = data.split("\n");

const valuesMap = new Map(values.map((value) => [parseInt(value, 10), true]));

// This one is O(n)

const computeData = (values) => {
  for (const left of values) {
    const test = 2020 - left;

    if (valuesMap.has(test)) return left * test;
  }
};

console.log(computeData(values));
