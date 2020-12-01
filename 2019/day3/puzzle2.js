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

const wire1Positions = computePositions(wire1).map(co => co.join(','));
const wire2Positions = computePositions(wire2).map(co => co.join(','));

const intersection = wire1Positions
    .find(value => wire2Positions.includes(value) && value !== '0,0');

const steps1 = wire1Positions.indexOf(intersection);
const steps2 = wire2Positions.indexOf(intersection);
const sumSteps = steps1 + steps2;

console.log(sumSteps);
