const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const expandMoves = () => {
    const moves = [];

    for (const line of lines) {
        const [direction, length] = line.split(' ');

        for (let i = 0; i < length; i += 1) {
            moves.push(direction);
        }
    }

    return moves;
};

const updatedFollowerCoordinates = (hCoords, tCoords) => {
    if (hCoords[0] - 2 === tCoords[0] && hCoords[1] === tCoords[1]) {
        // H is on the right
        tCoords[0] += 1;
    } else if (hCoords[0] + 2 === tCoords[0] && hCoords[1] === tCoords[1]) {
        // H is on the left
        tCoords[0] -= 1;
    } else if (hCoords[0] === tCoords[0] && hCoords[1] - 2 === tCoords[1]) {
        // H is on the top
        tCoords[1] += 1;
    } else if (hCoords[0] === tCoords[0] && hCoords[1] + 2 === tCoords[1]) {
        // H is on the bottom
        tCoords[1] -= 1;
    } else if ((hCoords[0] === tCoords[0] + 2 && hCoords[1] === tCoords[1] + 1) || (hCoords[0] === tCoords[0] + 1 && hCoords[1] === tCoords[1] + 2) || (hCoords[0] === tCoords[0] + 2 && hCoords[1] === tCoords[1] + 2)) {
        // H is bottom right
        tCoords[0] += 1;
        tCoords[1] += 1;
    } else if ((hCoords[0] === tCoords[0] - 2 && hCoords[1] === tCoords[1] + 1) || (hCoords[0] === tCoords[0] - 1 && hCoords[1] === tCoords[1] + 2) || (hCoords[0] === tCoords[0] - 2 && hCoords[1] === tCoords[1] + 2)) {
        // H is bottom left
        tCoords[0] -= 1;
        tCoords[1] += 1;
    } else if ((hCoords[0] === tCoords[0] - 2 && hCoords[1] === tCoords[1] - 1) || (hCoords[0] === tCoords[0] - 1 && hCoords[1] === tCoords[1] - 2) || (hCoords[0] === tCoords[0] - 2 && hCoords[1] === tCoords[1] - 2)) {
        // H is top left
        tCoords[0] -= 1;
        tCoords[1] -= 1;
    } else if ((hCoords[0] === tCoords[0] + 2 && hCoords[1] === tCoords[1] - 1) || (hCoords[0] === tCoords[0] + 1 && hCoords[1] === tCoords[1] - 2) || (hCoords[0] === tCoords[0] + 2 && hCoords[1] === tCoords[1] - 2)) {
        // H is top right
        tCoords[0] += 1;
        tCoords[1] -= 1;
    }
}

const part1 = () => {
    const hHistory = ['0,0'];
    const tHistory = ['0,0'];

    const hCoords = [0, 0];
    const tCoords = [0, 0];

    const moves = expandMoves(lines);

    for (const move of moves) {
        switch (move) {
            case 'U':
                hCoords[1] -= 1;
                break;
            case 'D':
                hCoords[1] += 1;
                break;
            case 'R':
                hCoords[0] += 1;
                break;
            case 'L':
                hCoords[0] -= 1;
                break;
        }

        updatedFollowerCoordinates(hCoords, tCoords);

        tHistory.push(tCoords.join(','));
        hHistory.push(hCoords.join(','));
    }

    return new Set(tHistory).size;
};

const part2 = () => {
    const hHistory = ['0,0'];
    const tHistory = ['0,0'];

    const coords = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]];

    const moves = expandMoves(lines);
    const hCoords = coords[0];
    const tCoords = coords[9];

    for (const move of moves) {
        switch (move) {
            case 'U':
                hCoords[1] -= 1;
                break;
            case 'D':
                hCoords[1] += 1;
                break;
            case 'R':
                hCoords[0] += 1;
                break;
            case 'L':
                hCoords[0] -= 1;
                break;
        }

        for (let i = 0; i < coords.length - 1; i += 1) {
            updatedFollowerCoordinates(coords[i], coords[i + 1]);
        }
        
        tHistory.push(tCoords.join(','));
        hHistory.push(hCoords.join(','));
    }

    return new Set(tHistory).size;
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
