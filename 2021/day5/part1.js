const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const vents = data.split("\n");

const map = new Map();

for (const vent of vents) {
  const [start, end] = vent.split(" -> ");
  const [x1, y1] = start.split(",").map(Number);
  const [x2, y2] = end.split(",").map(Number);

  if (x1 === x2) {
    const startY = y1 > y2 ? y2 : y1;
    const endY = y1 > y2 ? y1 : y2;
    for (let y = startY; y <= endY; y += 1) {
      const key = [x1, y].join(",");
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    continue;
  } else if (y1 === y2) {
    const startX = x1 > x2 ? x2 : x1;
    const endX = x1 > x2 ? x1 : x2;
    for (let x = startX; x <= endX; x += 1) {
      const key = [x, y1].join(",");
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    continue;
  }
}

const numberOfPointsWhereMultipleLinesOverlap = Array.from(map.values()).filter(
  (quantity) => quantity > 1
).length;

console.log(numberOfPointsWhereMultipleLinesOverlap);
