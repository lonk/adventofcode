const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const computeCoordinatesToUpdate = (coordinates) => {
  const [x, y] = coordinates.split(",").map(Number);

  return [
    [x - 1, y],
    [x + 1, y],
    [x - 1, y - 1],
    [x + 1, y - 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y + 1],
    [x - 1, y + 1],
  ].map((c) => c.join(","));
};

const map = new Map();

for (const [y, line] of lines.entries()) {
  const heights = line.split("");

  for (const [x, risk] of heights.entries()) {
    map.set(`${x},${y}`, parseInt(risk, 10));
  }
}

let totalFlashes = 0;
for (let step = 0; step < 100; step += 1) {
  for (const [coordinates, power] of Array.from(map.entries())) {
    map.set(coordinates, power + 1);
  }

  let isCompleted = false;

  do {
    const octopusesToFlash = Array.from(map.entries()).filter(
      ([_, power]) => power > 9
    );

    if (octopusesToFlash.length === 0) {
      isCompleted = true;
      break;
    }

    for (const [octopusToFlash] of octopusesToFlash) {
      const coordinatesToUpdate = computeCoordinatesToUpdate(octopusToFlash);

      map.set(octopusToFlash, 0);

      for (const octopusToUpdate of coordinatesToUpdate) {
        if (
          map.get(octopusToUpdate) === undefined ||
          map.get(octopusToUpdate) === 0
        )
          continue;

        map.set(octopusToUpdate, map.get(octopusToUpdate) + 1);
      }
    }
  } while (!isCompleted);

  totalFlashes += Array.from(map.values()).filter(
    (power) => power === 0
  ).length;
}

console.log(totalFlashes);
