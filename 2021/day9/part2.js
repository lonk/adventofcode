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

const computeBasin = (heightMap, basin) => {
  const updatedBasin = new Set(basin);
  for (const coordinates of Array.from(basin)) {
    const [x, y] = coordinates.split(",").map(Number);

    const up = heightMap.get(`${x},${y - 1}`);
    const down = heightMap.get(`${x},${y + 1}`);
    const left = heightMap.get(`${x - 1},${y}`);
    const right = heightMap.get(`${x + 1},${y}`);

    if (up !== undefined && up !== 9) updatedBasin.add(`${x},${y - 1}`);
    if (down !== undefined && down !== 9) updatedBasin.add(`${x},${y + 1}`);
    if (left !== undefined && left !== 9) updatedBasin.add(`${x - 1},${y}`);
    if (right !== undefined && right !== 9) updatedBasin.add(`${x + 1},${y}`);
  }

  if (basin.size === updatedBasin.size) return basin;

  return computeBasin(heightMap, updatedBasin);
};

const heightMap = new Map();

for (const [y, line] of lines.entries()) {
  const heights = line.split("");

  for (const [x, height] of heights.entries()) {
    heightMap.set(`${x},${y}`, parseInt(height, 10));
  }
}

const basinSizes = [];
for (const [y, line] of lines.entries()) {
  const heights = line.split("");
  for (const x of heights.keys()) {
    if (isLowPoint(heightMap, x, y)) {
      const basin = computeBasin(heightMap, new Set([`${x},${y}`]));
      basinSizes.push(basin.size);
    }
  }
}

const sortedBasinSizes = basinSizes.sort((a, b) => b - a);

console.log(sortedBasinSizes[0] * sortedBasinSizes[1] * sortedBasinSizes[2]);
