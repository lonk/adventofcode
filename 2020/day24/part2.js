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

const computeBlackTiles = (tiles) => {
  const blackTiles = new Set();

  for (const tile of tiles) {
    const coordinates = computeTileCubeCoordinates(tile);

    if (blackTiles.has(coordinates)) blackTiles.delete(coordinates);
    else blackTiles.add(coordinates);
  }

  return blackTiles;
};

const computeTileNeighbours = (coordinates) => {
  const [x, y, z] = coordinates
    .split(",")
    .map((coordinate) => parseInt(coordinate, 10));

  return [
    [x + 1, y - 1, z].join(","),
    [x - 1, y + 1, z].join(","),
    [x + 1, y, z - 1].join(","),
    [x - 1, y, z + 1].join(","),
    [x, y + 1, z - 1].join(","),
    [x, y - 1, z + 1].join(","),
  ];
};

const computeWhiteTilesToBeChecked = (blackTiles) => {
  const whiteTiles = new Set();

  for (const coordinates of Array.from(blackTiles)) {
    const neighbours = computeTileNeighbours(coordinates);

    for (const neighbourCoordinates of neighbours) {
      if (blackTiles.has(neighbourCoordinates)) continue;

      whiteTiles.add(neighbourCoordinates);
    }
  }

  return whiteTiles;
};

const computeNewBlackTiles = (blackTiles, whiteTiles) => {
  const updatedBlackTiles = new Set();

  for (const blackTile of blackTiles) {
    const neighbours = computeTileNeighbours(blackTile);
    const blackNeighboursCount = neighbours.reduce(
      (acc, coordinates) => (blackTiles.has(coordinates) ? acc + 1 : acc),
      0
    );

    if (!(blackNeighboursCount === 0 || blackNeighboursCount > 2)) {
      updatedBlackTiles.add(blackTile);
    }
  }

  for (const whiteTile of whiteTiles) {
    const neighbours = computeTileNeighbours(whiteTile);
    const blackNeighboursCount = neighbours.reduce(
      (acc, coordinates) => (blackTiles.has(coordinates) ? acc + 1 : acc),
      0
    );

    if (blackNeighboursCount === 2) {
      updatedBlackTiles.add(whiteTile);
    }
  }

  return updatedBlackTiles;
};

const baseBlackTiles = computeBlackTiles(tiles);
let blackTiles = baseBlackTiles;
for (let round = 0; round < 100; round += 1) {
  const whiteTiles = computeWhiteTilesToBeChecked(blackTiles);
  blackTiles = computeNewBlackTiles(blackTiles, whiteTiles);
}

console.log(blackTiles.size);
