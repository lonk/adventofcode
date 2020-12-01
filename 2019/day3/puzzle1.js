const fs = require('fs');

const data = fs.readFileSync('day3.data', { encoding: 'utf-8' });

const [wire1, wire2] = data.split("\n");

const generatePositions = (from, direction, length) => {
    const positions = [];
    const fromX = from[0];
    const fromY = from[1];

    switch (direction) {
        case 'U':
            for (let y = fromY + 1; y <= fromY + length; y++) {
                positions.push([fromX, y]);
            }
            break;
        case 'D':
            for (let y = fromY - 1; y >= fromY - length; y--) {
                positions.push([fromX, y]);
            }
            break;
        case 'R':
            for (let x = fromX + 1; x <= fromX + length; x++) {
                positions.push([x, fromY]);
            }
            break;
        case 'L':
            for (let x = fromX - 1; x >= fromX - length; x--) {
                positions.push([x, fromY]);
            }
            break;
    }

    return positions;
};


const computePositions = wire => {
    const moves = wire.split(',');

    const positions = [[0, 0]];

    moves.forEach(move => {
        const direction = move.charAt(0);
        const length = parseInt(move.substr(1), 10);
        const previousPosition = positions[positions.length - 1];

        positions.push(...generatePositions(previousPosition, direction, length));
    });

    return positions;
};

let result;
let lim = 500;

while (!result) {
    const wire1Positions = computePositions(wire1).filter(([x, y]) => Math.abs(x) + Math.abs(y) < lim).map(co => co.join(','));
    const wire2Positions = computePositions(wire2).filter(([x, y]) => Math.abs(x) + Math.abs(y) < lim).map(co => co.join(','));

    const intersections = wire1Positions
        .filter(value => wire2Positions.includes(value))
        .map(co => co.split(','))
        .map(([x, y]) => Math.abs(x) + Math.abs(y))
        .sort((a, b) => a - b);

    result = intersections[1];
    lim *= 2;
}

console.log(result);
