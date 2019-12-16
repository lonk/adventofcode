const fs = require('fs');

const data = fs.readFileSync('day11.data', { encoding: 'utf-8' });

const program = data.split(',').map(value => parseInt(value, 10));

const translate = direction => {
    if (direction === 0) return 'up';
    if (direction === 1) return 'right';
    if (direction === 2) return 'down';
    if (direction === 3) return 'left';
};

const newCoordinates = (initialDirection, initialX, initialY, output) => {
    const direction = output === 0 ? (initialDirection + 3) % 4 : (initialDirection + 1) % 4;

    let x = initialX;
    let y = initialY;

    switch (direction) {
        case 0:
            y++;
            break;
        case 1:
            x++;
            break;
        case 2:
            y--;
            break;
        case 3:
            x--;
            break;
    }

    return { direction, x, y };
}


const generateOutputByMode = (type, input, mode, relativeBase, program) => {
    if (type === 'write') {
        return mode === 2 ? relativeBase + input : input;
    }

    return mode === 0
        ? program[input]
        : mode === 1
            ? input
            : program[input + relativeBase];
};

let cursor = 0;
let relativeBase = 0;
let x = 0;
let y = 0;
let direction = 0;
let waitingForColor = true;
const map = {};

while (program[cursor] && cursor !== -1) {
    const mode = program[cursor].toString().padStart(5, '0');
    const opcode = parseInt(mode.substring(3), 10);

    const paramMode1 = parseInt(mode.charAt(2), 10);
    const paramMode2 = parseInt(mode.charAt(1), 10);
    const paramMode3 = parseInt(mode.charAt(0), 10);

    const param1 = program[cursor + 1];
    const param2 = program[cursor + 2];
    const param3 = program[cursor + 3];

    let addressToWrite, paramValue1, paramValue2, paramValue3;

    switch (opcode) {
        case 1:
            addressToWrite = generateOutputByMode('write', param3, paramMode3, relativeBase, program);
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);

            program[addressToWrite] = paramValue1 + paramValue2;

            cursor += 4;
            break;
        case 2:
            addressToWrite = generateOutputByMode('write', param3, paramMode3, relativeBase, program);
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);

            program[addressToWrite] = paramValue1 * paramValue2;

            cursor += 4;
            break;
        case 3:
            addressToWrite = generateOutputByMode('write', param1, paramMode1, relativeBase, program);

            program[addressToWrite] = map[`${x},${y}`] || 0;

            cursor += 2;
            break;
        case 4:
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);

            //console.log('Output:', paramValue1);

            if (waitingForColor) {
                map[`${x},${y}`] = paramValue1;
                waitingForColor = false;
            } else {
                ({ direction, x, y } = newCoordinates(direction, x, y, paramValue1));
                waitingForColor = true;
            }

            cursor += 2;
            break;
        case 5:
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);
            if (paramValue1 !== 0) {
                cursor = paramValue2;
            } else {
                cursor += 3;
            }
            break;
        case 6:
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);
            if (paramValue1 === 0) {
                cursor = paramValue2;
            } else {
                cursor += 3;
            }
            break;
        case 7:
            addressToWrite = generateOutputByMode('write', param3, paramMode3, relativeBase, program);
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);

            program[addressToWrite] = paramValue1 < paramValue2 ? 1 : 0;

            cursor += 4;
            break;
        case 8:
            addressToWrite = generateOutputByMode('write', param3, paramMode3, relativeBase, program);
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);

            program[addressToWrite] = paramValue1 === paramValue2 ? 1 : 0;

            cursor += 4;
            break;
        case 9:
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);

            relativeBase += paramValue1;

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

console.log(Object.keys(map).length);
