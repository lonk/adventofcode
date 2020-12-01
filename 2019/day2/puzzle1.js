const fs = require('fs');

const data = fs.readFileSync('day2.data', { encoding: 'utf-8' });

const program = data.split(',').map(value => parseInt(value, 10));

program[1] = 12;
program[2] = 2;

let i = 0;

while (program[i] && program[i] !== 99) {
    const mode = program[i];
    const address1 = program[i + 1];
    const value1 = program[address1];
    const address2 = program[i + 2];
    const value2 = program[address2];
    const addressResult = program[i + 3];

    program[addressResult] = mode === 1
        ? value1 + value2
        : value1 * value2;

    i += 4;
}

console.log(program[0]);
