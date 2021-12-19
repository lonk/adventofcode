const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const costs = new Map();
const distancesFromStart = new Map();
let end;

for (const [y, line] of lines.entries()) {
  const heights = line.split("");

  for (const [x, height] of heights.entries()) {
    const key = `${x},${y}`;
    costs.set(key, parseInt(height, 10));
    distancesFromStart.set(key, +Infinity);
    end = key;
  }
}
distancesFromStart.set("0,0", 0);

const getClosestNode = (distances, notVisited) =>
  Array.from(distances.entries())
    .filter(([coordinates]) => notVisited.has(coordinates))
    .sort((a, b) => a[1] - b[1])[0][0];

const getNeighbors = (cursor) => {
  const [x, y] = cursor.split(",").map(Number);

  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].map((c) => c.join(","));
};

while (costs.size > 0) {
  const cursor = getClosestNode(distancesFromStart, costs);
  const neighbors = getNeighbors(cursor);

  for (const neighbor of neighbors) {
    if (
      !costs.get(neighbor) ||
      distancesFromStart.get(neighbor) <=
        distancesFromStart.get(cursor) + costs.get(neighbor)
    )
      continue;

    distancesFromStart.set(
      neighbor,
      distancesFromStart.get(cursor) + costs.get(neighbor)
    );
  }

  costs.delete(cursor);
}

console.log(distancesFromStart.get(end));
