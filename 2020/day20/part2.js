const { readFileSync } = require("fs");
const { clockWiseRotate, flip } = require("./tools");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const computeCombinations = (grid) => {
  const gridsCombinations = [];

  let gridToRotate = grid.slice();
  let mirroredGridToRotate = flip(grid.slice());

  for (let rotate = 0; rotate < 4; rotate += 1) {
    for (let iteration = 0; iteration < rotate; iteration += 1) {
      gridToRotate = clockWiseRotate(gridToRotate).slice();
      mirroredGridToRotate = clockWiseRotate(mirroredGridToRotate).slice();
    }

    gridsCombinations.push(gridToRotate);
    gridsCombinations.push(mirroredGridToRotate);
  }

  return gridsCombinations;
};

const possibleGridsByTileId = new Map(
  data.split("\n\n").map((tile) => {
    const [idString, ...gridParts] = tile.split("\n");

    const id = parseInt(idString.split(" ")[1].slice(0, -1), 10);
    const grid = gridParts.map((line) => line.split(""));

    const gridsCombinations = computeCombinations(grid);

    return [id, gridsCombinations];
  })
);

const computeGridSides = (grid) => {
  const top = grid[0];
  const bottom = grid[grid.length - 1];
  const left = [];
  const right = [];

  for (const line of grid) {
    left.push(line[0]);
    right.push(line[line.length - 1]);
  }

  return { top, bottom, left, right };
};

// -x: left
// x: right
// -y: bottom
// y: top
const computePossibleCoordinates = (coordinates, source, neighbour) => {
  const tileSides = computeGridSides(source);
  const neighbourSides = computeGridSides(neighbour);
  const [x, y] = coordinates
    .split(",")
    .map((coordinate) => parseInt(coordinate, 10));

  if (tileSides.top.toString() === neighbourSides.bottom.toString())
    return `${x},${y + 1}`;
  if (tileSides.bottom.toString() === neighbourSides.top.toString())
    return `${x},${y - 1}`;
  if (tileSides.left.toString() === neighbourSides.right.toString())
    return `${x - 1},${y}`;
  if (tileSides.right.toString() === neighbourSides.left.toString())
    return `${x + 1},${y}`;

  return false;
};

const firstEntry = Array.from(possibleGridsByTileId.entries())[0];
const firstTileId = firstEntry[0];
const firstTileGrid = firstEntry[1][0];

const computeMap = (
  coordinates = "0,0",
  map = new Map([
    [
      "0,0",
      {
        tileId: firstTileId,
        grid: firstTileGrid,
      },
    ],
  ])
) => {
  let updatedMap = new Map(map);
  const currentMapPosition = map.get(coordinates);

  for (const [tileId, gridsCombinations] of Array.from(
    possibleGridsByTileId.entries()
  )) {
    if (tileId === currentMapPosition.tileId) continue;

    for (const grid of gridsCombinations) {
      const nextCoordinates = computePossibleCoordinates(
        coordinates,
        currentMapPosition.grid,
        grid
      );

      if (nextCoordinates && !updatedMap.has(nextCoordinates)) {
        updatedMap.set(nextCoordinates, { tileId, grid });
        updatedMap = computeMap(nextCoordinates, updatedMap);
      }
    }
  }

  return updatedMap;
};

const map = computeMap();

const usedCoordinates = Array.from(map.keys()).map((xy) =>
  xy.split(",").map((coordinate) => parseInt(coordinate, 10))
);

const smallestX = Math.min(...usedCoordinates.map(([x]) => x));
const greatestX = Math.max(...usedCoordinates.map(([x]) => x));
const smallestY = Math.min(...usedCoordinates.map(([_, y]) => y));
const greatestY = Math.max(...usedCoordinates.map(([_, y]) => y));

const reunitedMap = [];

for (let y = smallestY; y <= greatestY; y += 1) {
  for (let x = smallestX; x <= greatestX; x += 1) {
    const { grid } = map.get(`${x},${y}`);

    const reunitedMapLine = (greatestY - y) * (grid.length - 2);

    for (const [index, line] of grid.entries()) {
      if (index === 0 || index === grid.length - 1) continue;
      const lineWithoutFirstAndLast = line.slice();
      lineWithoutFirstAndLast.shift();
      lineWithoutFirstAndLast.pop();
      reunitedMap[reunitedMapLine + index - 1] = (
        reunitedMap[reunitedMapLine + index - 1] || []
      ).concat(lineWithoutFirstAndLast);
    }
  }
}

const reunitedMapCombinations = computeCombinations(reunitedMap);
const regexp = /..................#.\n#....##....##....###\n.#..#..#..#..#..#.../g;

for (const grid of reunitedMapCombinations) {
  let seaDragonsCount = 0;
  for (let i = 0; i < grid[0].length - 20; i += 1) {
    const windowedGrid = grid
      .map((line) => line.slice(i, i + 20).join(""))
      .join("\n");

    const check = windowedGrid.match(regexp);

    if (check) seaDragonsCount += check.length;
  }

  if (seaDragonsCount > 0) {
    const fullGrid = grid.map((line) => line.join("")).join("\n");
    const numberOffPlainTiles = fullGrid.match(/#/g).length;
    console.log(numberOffPlainTiles - seaDragonsCount * 15);
    break;
  }
}
