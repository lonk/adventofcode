const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

// This algorithm manages to find if a tile is a corner only (which is enough for part1)

const computeCorners = (grid) => {
  const top = grid[0];
  const bottom = grid[grid.length - 1];
  let left = "";
  let right = "";

  for (const line of grid) {
    left += line.charAt(0);
    right += line.charAt(line.length - 1);
  }

  return { top, bottom, left, right };
};

const computeAllCornersCombinations = (grid) => {
  const { top, bottom, left, right } = computeCorners(grid);

  return [
    top,
    bottom,
    left,
    right,
    top.split("").reverse().join(""),
    bottom.split("").reverse().join(""),
    left.split("").reverse().join(""),
    right.split("").reverse().join(""),
  ];
};

const bordersCombinationsByTileId = new Map(
  data.split("\n\n").map((tile) => {
    const [idString, ...grid] = tile.split("\n");

    const id = parseInt(idString.split(" ")[1].slice(0, -1), 10);

    return [id, computeAllCornersCombinations(grid)];
  })
);

const foundAllTileNeighbours = (tileId) => {
  const bordersCombinations = bordersCombinationsByTileId.get(tileId);
  const neighbours = [];

  for (const borderCombination of bordersCombinations) {
    for (const [neighbourId, neighbourCombinations] of Array.from(
      bordersCombinationsByTileId.entries()
    )) {
      if (neighbourId === tileId) continue;

      if (
        neighbourCombinations.includes(borderCombination) &&
        !neighbours.includes(neighbourId)
      )
        neighbours.push(neighbourId);
    }
  }

  return neighbours;
};

const computeCornersTileId = () =>
  Array.from(bordersCombinationsByTileId.keys()).filter(
    (tileId) => foundAllTileNeighbours(tileId).length === 2
  );

console.log(computeCornersTileId().reduce((acc, tileId) => tileId * acc, 1));
