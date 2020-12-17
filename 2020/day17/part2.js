const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const initialGrid = new Map(
  lines.flatMap((line, y) => {
    const column = line.split("");

    return column.map((box, x) => [`${x},${y},0,0`, box]);
  })
);

const neighboursMemory = new Map();

const computeAllNeighboursCoordinates = (coordinates) => {
  const [x, y, z, w] = coordinates.split(",").map((axis) => parseInt(axis, 10));
  const neighbours = [];

  for (let indexX = x - 1; indexX <= x + 1; indexX += 1) {
    for (let indexY = y - 1; indexY <= y + 1; indexY += 1) {
      for (let indexZ = z - 1; indexZ <= z + 1; indexZ += 1) {
        for (let indexW = w - 1; indexW <= w + 1; indexW += 1) {
          if (indexX === x && indexY === y && indexZ === z && indexW === w)
            continue;
          neighbours.push(`${indexX},${indexY},${indexZ},${indexW}`);
        }
      }
    }
  }

  return neighbours;
};

const computeNewBoxValue = (grid, box, neighbours) => {
  let activeNeighboursCount = 0;
  // Bit of optimisation from previous part
  for (const neighbour of neighbours) {
      if (activeNeighboursCount > 3) break;
      activeNeighboursCount += grid.get(neighbour) === "#" ? 1 : 0
  }

  if (
    ((activeNeighboursCount === 2 || activeNeighboursCount === 3) &&
      box === "#") ||
    (activeNeighboursCount === 3 && box === ".")
  )
    return "#";

  return ".";
};

let previousGrid = new Map(initialGrid);
for (let cycle = 0; cycle < 6; cycle += 1) {
  const newGrid = new Map(previousGrid);
  const newCoordinatesToCheck = new Set();
  for (const [coordinates, box] of Array.from(previousGrid.entries())) {
    // Bit of optimisation from previous part
    const neighbours =
      neighboursMemory.get(coordinates) ||
      computeAllNeighboursCoordinates(coordinates);
    neighboursMemory.set(coordinates, neighbours);
    newGrid.set(coordinates, computeNewBoxValue(previousGrid, box, neighbours));

    for (const neighbour of neighbours) {
      if (!previousGrid.has(neighbour)) newCoordinatesToCheck.add(neighbour);
    }
  }

  for (const coordinates of Array.from(newCoordinatesToCheck)) {
    const neighbours = computeAllNeighboursCoordinates(coordinates);
    newGrid.set(coordinates, computeNewBoxValue(previousGrid, ".", neighbours));
  }

  previousGrid = newGrid;
}

const states = Array.from(previousGrid.values());

console.log(states.filter((state) => state === "#").length);
