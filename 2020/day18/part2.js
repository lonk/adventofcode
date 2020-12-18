const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const lineResults = lines.map((line) => {
  const sumsGroupsByDepth = new Map([[0, [0]]]);
  let depth = 0;
  const chars = line.split("");

  for (const char of chars) {
    const sumGroups = sumsGroupsByDepth.get(depth);
    switch (char) {
      case " ":
        continue;
      case "(":
        depth += 1;
        sumsGroupsByDepth.set(depth, [0]);
        break;
      case ")":
        const parentGroups = sumsGroupsByDepth.get(depth - 1);
        parentGroups[parentGroups.length - 1] =
          parentGroups[parentGroups.length - 1] +
          sumGroups.reduce((acc, number) => acc * number, 1);
        depth -= 1;
        break;
      case "*":
        sumsGroupsByDepth.set(depth, [...sumGroups, 0]);
        break;
      case "+":
        break;
      default:
        const number = parseInt(char, 10);
        sumGroups[sumGroups.length - 1] =
          sumGroups[sumGroups.length - 1] + number;
        sumsGroupsByDepth.set(depth, sumGroups);
    }
  }

  return sumsGroupsByDepth.get(0).reduce((acc, number) => acc * number, 1);
});

console.log(lineResults.reduce((acc, lineResult) => acc + lineResult, 0));
