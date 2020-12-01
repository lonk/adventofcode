const fs = require('fs');
const readlineSync = require('readline-sync');

const data = fs.readFileSync('day5.data', { encoding: 'utf-8' });

const program = data.split(',').map(value => parseInt(value, 10));

let cursor = 0;

// Note: Writing address are always giving a position to write to
while (program[cursor] && cursor !== -1) {
    const mode = program[cursor].toString().padStart(5, '0');
    const opcode = parseInt(mode.substring(3), 10);

    const paramMode1 = parseInt(mode.charAt(2), 10);
    const paramMode2 = parseInt(mode.charAt(1), 10);

    const param1 = program[cursor + 1];
    const param2 = program[cursor + 2];
    const param3 = program[cursor + 3];

    const paramValue1 = paramMode1 === 0 ? program[param1] : param1;
    const paramValue2 = paramMode2 === 0 ? program[param2] : param2;

    let input;

    switch (opcode) {
        case 1:
            program[param3] = paramValue1 + paramValue2;

            cursor += 4;
            break;
        case 2:
            program[param3] = paramValue1 * paramValue2;

            cursor += 4;
            break;
        case 3:
            input = readlineSync.questionInt('What is the input ? ');
            program[param1] = input;

            cursor += 2;
            break;
        case 4:
            console.log('Output:', paramValue1);

            cursor += 2;
            break;
        case 99:
            console.log('Opcode 99');
            cursor = -1;
            break;
        default:
            console.log('Unknown opcode', opcode);
            cursor = -1;
            break;
    }
}
