const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const values = data.split("\n");

let horizontalPosition = 0;
let depth = 0;
let aim = 0;

for (const line of values) {
    const [direction, quantity] = line.split(' ');

    switch (direction) {
        case 'forward':
            horizontalPosition += parseInt(quantity, 10);
            depth += aim * parseInt(quantity, 10);
            break;
        case 'down':
            aim += parseInt(quantity, 10);
            break;
        case 'up':
            aim -= parseInt(quantity, 10);
            break;
        default:
            throw new Error('Malformed puzzle');
    }
}

console.log(horizontalPosition * depth);
