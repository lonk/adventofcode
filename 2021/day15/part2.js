const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const costs = new Map();
const distancesFromStart = new Map();
const priorityQueue = [];
let end;

const generateKeys = (x, y, maxX, maxY) => {
  const keys = new Set();
  for (let right = 0; right < 5; right += 1) {
    for (let bottom = 0; bottom < 5; bottom += 1) {
      keys.add([`${x + right * maxX},${y + bottom * maxY}`, right + bottom]);
    }
  }

  return Array.from(keys);
};

for (const [y, line] of lines.entries()) {
  const heights = line.split("");

  for (const [x, risk] of heights.entries()) {
    const keys = generateKeys(x, y, heights.length, lines.length);

    for (const [key, add] of keys) {
      costs.set(key, ((parseInt(risk, 10) + add - 1) % 9) + 1);
      distancesFromStart.set(key, +Infinity);
      end = key;
    }
  }
}
distancesFromStart.set("0,0", 0);
priorityQueue.push(["0,0", 0]);

const getNeighbors = (cursor) => {
  const [x, y] = cursor.split(",").map(Number);

  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].map((c) => c.join(","));
};

while (priorityQueue.length > 0) {
  const [cursor] = priorityQueue.pop();
  const neighbors = getNeighbors(cursor);

  for (const neighbor of neighbors) {
    if (
      !costs.get(neighbor) ||
      (distancesFromStart.get(neighbor) &&
        distancesFromStart.get(neighbor) <=
          distancesFromStart.get(cursor) + costs.get(neighbor))
    )
      continue;

    distancesFromStart.set(
      neighbor,
      distancesFromStart.get(cursor) + costs.get(neighbor)
    );

    priorityQueue.push([
      neighbor,
      distancesFromStart.get(cursor) + costs.get(neighbor),
    ]);
    priorityQueue.sort((a, b) => b[1] - a[1]);
    costs.delete(cursor);
  }
}

console.log(distancesFromStart.get(end));
