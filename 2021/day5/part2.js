const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const vents = data.split("\n");

const map = new Map();

for (const vent of vents) {
  const [start, end] = vent.split(" -> ");
  const [x1, y1] = start.split(",").map(Number);
  const [x2, y2] = end.split(",").map(Number);

  const xStep = x1 === x2 ? 0 : x1 < x2 ? 1 : -1;
  const yStep = y1 === y2 ? 0 : y1 < y2 ? 1 : -1;
  let x = x1;
  let y = y1;

  while (x !== x2 + xStep || y !== y2 + yStep) {
    const key = [x, y].join(",");
    map.set(key, (map.get(key) ?? 0) + 1);
    x += xStep;
    y += yStep;
  }
}

const numberOfPointsWhereMultipleLinesOverlap = Array.from(map.values()).filter(
  (quantity) => quantity > 1
).length;

console.log(numberOfPointsWhereMultipleLinesOverlap);
