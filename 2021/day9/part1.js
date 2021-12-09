const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const isLowPoint = (heightMap, x, y) => {
  const current = heightMap.get(`${x},${y}`);
  const up = heightMap.get(`${x},${y - 1}`) ?? +Infinity;
  const down = heightMap.get(`${x},${y + 1}`) ?? +Infinity;
  const left = heightMap.get(`${x - 1},${y}`) ?? +Infinity;
  const right = heightMap.get(`${x + 1},${y}`) ?? +Infinity;

  return current < up && current < down && current < left && current < right;
};

const heightMap = new Map();

for (const [y, line] of lines.entries()) {
  const heights = line.split("");

  for (const [x, height] of heights.entries()) {
    heightMap.set(`${x},${y}`, parseInt(height, 10));
  }
}

let riskSum = 0;
for (const [y, line] of lines.entries()) {
  const heights = line.split("");
  for (const x of heights.keys()) {
    if (isLowPoint(heightMap, x, y)) {
      riskSum += 1 + heightMap.get(`${x},${y}`);
    }
  }
}

console.log(riskSum);
