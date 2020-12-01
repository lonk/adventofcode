const { readFileSync } = require("fs");

const data = readFileSync("puzzle1.data", { encoding: "utf-8" });

const values = data.split("\n");

const computeData = (values) => {
  for (const [leftIndex, strLeft] of values.entries()) {
    const left = parseInt(strLeft, 10);

    for (const [rightIndex, strRight] of values.entries()) {
      if (leftIndex === rightIndex) continue;

      const right = parseInt(strRight, 10);

      if (left + right === 2020) {
        return left * right;
      }
    }
  }
};

console.log(computeData(values));
