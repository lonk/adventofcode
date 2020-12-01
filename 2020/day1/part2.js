const { readFileSync } = require("fs");

const data = readFileSync("puzzle1.data", { encoding: "utf-8" });

const values = data.split("\n");

const computeData = (values) => {
  for (const [leftIndex, strLeft] of values.entries()) {
    const left = parseInt(strLeft, 10);

    for (const [rightIndex, strRight] of values.entries()) {
      const right = parseInt(strRight, 10);

      for (const [thirdIndex, strThird] of values.entries()) {
        if (
          leftIndex === rightIndex ||
          leftIndex === thirdIndex ||
          rightIndex === thirdIndex
        )
          continue;

        const third = parseInt(strThird, 10);

        if (left + right + third === 2020) {
          return left * right * third;
        }
      }
    }
  }
};

console.log(computeData(values));
