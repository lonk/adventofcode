const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const parseGrid = () => {
    const grid = new Map();

    let x = 0;
    let y = 0;
    for (const line of lines) {
        const rows = line.split('');

        x = 0;
        for (const row of rows) {
            grid.set(`${x},${y}`, parseInt(row, 10));
            x += 1;
        }

        y += 1;
    }

    return { grid, maxX: x - 1, maxY: y - 1 };
};

const isTreeVisible = (coordinates, maxX, maxY, grid) => {
    const [treeX, treeY] = coordinates.split(',').map(Number);

    if (treeX === 0 || treeY === 0 || treeX === maxX || treeY === maxY) return true;

    let isVisibleLeft = true;
    for (let x = treeX - 1;  x >= 0; x--) {
        if (grid.get(`${x},${treeY}`) >= grid.get(`${treeX},${treeY}`)) {
            isVisibleLeft = false;
            break;
        }
    }

    let isVisibleRight = true;
    for (let x = treeX + 1;  x <= maxX; x++) {
        if (grid.get(`${x},${treeY}`) >= grid.get(`${treeX},${treeY}`)) {
            isVisibleRight = false;
            break;
        }
    }

    let isVisibleTop = true;
    for (let y = treeY - 1;  y >= 0; y--) {
        if (grid.get(`${treeX},${y}`) >= grid.get(`${treeX},${treeY}`)) {
            isVisibleTop = false;
            break;
        }
    }

    let isVisibleBottom = true;
    for (let y = treeY + 1;  y <= maxY; y++) {
        if (grid.get(`${treeX},${y}`) >= grid.get(`${treeX},${treeY}`)) {
            isVisibleBottom = false;
            break;
        }
    }

    return isVisibleLeft || isVisibleRight || isVisibleTop || isVisibleBottom;
};

const computeTreeScore = (coordinates, maxX, maxY, grid) => {
    const [treeX, treeY] = coordinates.split(',').map(Number);

    let leftScore = 0;
    if (treeX > 0) {
        for (let x = treeX - 1;  x >= 0; x--) {
            leftScore += 1;
            if (grid.get(`${x},${treeY}`) >= grid.get(`${treeX},${treeY}`)) {
                break;
            }
        }
    }

    let rightScore = 0;
    if (treeX < maxX) {
        for (let x = treeX + 1;  x <= maxX; x++) {
            rightScore += 1;
            if (grid.get(`${x},${treeY}`) >= grid.get(`${treeX},${treeY}`)) {
                break;
            }
        }
    }

    let topScore = 0;
    if (treeY > 0) {
        for (let y = treeY - 1;  y >= 0; y--) {
            topScore += 1;
            if (grid.get(`${treeX},${y}`) >= grid.get(`${treeX},${treeY}`)) {
                break;
            }
        }
    }

    let bottomScore = 0;
    if (treeY < maxY) {
        for (let y = treeY + 1;  y <= maxY; y++) {
            bottomScore += 1;
            if (grid.get(`${treeX},${y}`) >= grid.get(`${treeX},${treeY}`)) {
                break;
            }
        }
    }

    return leftScore * rightScore * topScore * bottomScore;
};

const part1 = () => {
    const { grid, maxX, maxY } = parseGrid();

    return Array.from(grid.keys())
        .reduce((acc, coordinates) => isTreeVisible(coordinates, maxX, maxY, grid) ? acc + 1 : acc, 0);
};

const part2 = () => {
    const { grid, maxX, maxY } = parseGrid();

    return Array.from(grid.keys())
        .reduce((highestScore, coordinates) => {
            const score = computeTreeScore(coordinates, maxX, maxY, grid);

            if (score > highestScore) return score;

            return highestScore;
        }, 0);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
