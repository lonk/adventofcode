const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });
const tiles = data.split("\n");

const computeTileCubeCoordinates = (tile) => {
  const coordinates = [0, 0, 0];
  let index = 0;

  while (index < tile.length) {
    const char = tile.charAt(index);
    let direction = char;

    if (char === "n" || char === "s") {
      direction += tile.charAt(index + 1);
      index += 1;
    }

    switch (direction) {
      case "e":
        coordinates[0] += 1;
        coordinates[1] -= 1;
        break;
      case "w":
        coordinates[0] -= 1;
        coordinates[1] += 1;
        break;
      case "ne":
        coordinates[0] += 1;
        coordinates[2] -= 1;
        break;
      case "sw":
        coordinates[0] -= 1;
        coordinates[2] += 1;
        break;
      case "nw":
        coordinates[1] += 1;
        coordinates[2] -= 1;
        break;
      case "se":
        coordinates[1] -= 1;
        coordinates[2] += 1;
        break;
    }

    index += 1;
  }

  return coordinates.join(",");
};

const blackTiles = new Set();

for (const tile of tiles) {
  const coordinates = computeTileCubeCoordinates(tile);

  if (blackTiles.has(coordinates)) blackTiles.delete(coordinates);
  else blackTiles.add(coordinates);
}

console.log(blackTiles.size);
