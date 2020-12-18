const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const lineResults = lines.map((line) => {
  const sums = new Map([[0, 0]]);
  const depthOperator = new Map([[0, "+"]]);
  let depth = 0;
  const chars = line.split("");

  for (const char of chars) {
    const sum = sums.get(depth);
    switch (char) {
      case " ":
        continue;
      case "(":
        depth += 1;
        sums.set(depth, 0);
        depthOperator.set(depth, "+");
        break;
      case ")":
        const parentSum = sums.get(depth - 1);
        if (depthOperator.get(depth - 1) === "+") {
          sums.set(depth - 1, parentSum + sum);
        } else if (depthOperator.get(depth - 1) === "*") {
          sums.set(depth - 1, parentSum * sum);
        }
        sums.set(depth, 0);
        depth -= 1;
        break;
      case "+":
      case "*":
        depthOperator.set(depth, char);
        break;
      default:
        const number = parseInt(char, 10);
        if (depthOperator.get(depth) === "+") {
          sums.set(depth, sum + number);
        } else if (depthOperator.get(depth) === "*") {
          sums.set(depth, sum * number);
        }
    }
  }

  return sums.get(0);
});

console.log(lineResults.reduce((acc, lineResult) => acc + lineResult, 0));
