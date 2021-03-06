const fs = require('fs');
const readlineSync = require('readline-sync');

const data = fs.readFileSync('day9.data', { encoding: 'utf-8' });

const program = data.split(',').map(value => parseInt(value, 10));

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

while (program[cursor] && cursor !== -1) {
    const mode = program[cursor].toString().padStart(5, '0');
    const opcode = parseInt(mode.substring(3), 10);

    const paramMode1 = parseInt(mode.charAt(2), 10);
    const paramMode2 = parseInt(mode.charAt(1), 10);
    const paramMode3 = parseInt(mode.charAt(0), 10);

    const param1 = program[cursor + 1];
    const param2 = program[cursor + 2];
    const param3 = program[cursor + 3];

    let input, addressToWrite, paramValue1, paramValue2, paramValue3;

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
            input = readlineSync.questionInt('What is the input ? ');
            program[addressToWrite] = input;

            cursor += 2;
            break;
        case 4:
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);

            console.log('Output:', paramValue1);

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
