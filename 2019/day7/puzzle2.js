const fs = require('fs');

const data = fs.readFileSync('day7.data', { encoding: 'utf-8' });
const baseProgram = data.split(',').map(value => parseInt(value, 10));

const compute = (inputs, program, initialCursor) => {
    let cursor = initialCursor;
    let cursorInput = 0;
    const outputs = [];

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
                input = inputs[cursorInput];

                if (input !== 0 && !input) {
                    return { inputs: outputs, program, cursor, hasHalt: false };
                }

                program[param1] = input;

                cursor += 2;
                cursorInput++;
                break;
            case 4:
                //console.log('Output:', paramValue1);
                outputs.push(paramValue1);

                cursor += 2;
                break;
            case 5:
                if (paramValue1 !== 0) {
                    cursor = paramValue2;
                } else {
                    cursor += 3;
                }
                break;
            case 6:
                if (paramValue1 === 0) {
                    cursor = paramValue2;
                } else {
                    cursor += 3;
                }
                break;
            case 7:
                program[param3] = paramValue1 < paramValue2 ? 1 : 0;

                cursor += 4;
                break;
            case 8:
                program[param3] = paramValue1 === paramValue2 ? 1 : 0;

                cursor += 4;
                break;
            case 99:
                //console.log('Opcode 99');
                return { inputs: outputs, program, cursor, hasHalt: true };
                cursor = -1;
                break;
            default:
                console.log('Unknown opcode', opcode);
                cursor = -1;
                break;
        }
    };
};

// https://stackoverflow.com/questions/37579994/generate-permutations-of-javascript-array
const permute = a => a.length ? a.reduce((r, v, i) => [ ...r, ...permute([ ...a.slice(0, i), ...a.slice(i + 1) ]).map(x => [ v, ...x ])], []) : [[]];

const permutations = permute([9, 7, 8, 5, 6]);

const values = permutations.map(perm => {
    let permCursor = 0;

    const amplifiers = {
        5: {
            program: [...baseProgram],
            phaseSent: false,
            inputs: [5],
            cursor: 0,
            hasHalt: false
        },
        6: {
            program: [...baseProgram],
            phaseSent: false,
            inputs: [6],
            cursor: 0,
            hasHalt: false
        },
        7: {
            program: [...baseProgram],
            phaseSent: false,
            inputs: [7],
            cursor: 0,
            hasHalt: false
        },
        8: {
            program: [...baseProgram],
            phaseSent: false,
            inputs: [8],
            cursor: 0,
            hasHalt: false
        },
        9: {
            program: [...baseProgram],
            phaseSent: false,
            inputs: [9],
            cursor: 0,
            hasHalt: false
        }
    };

    amplifiers[perm[permCursor]].inputs.push(0);

    while (!(amplifiers[5].hasHalt && amplifiers[6].hasHalt && amplifiers[7].hasHalt && amplifiers[8].hasHalt && amplifiers[9].hasHalt)) {
        const amplifier = amplifiers[perm[permCursor]];
        const result = compute(amplifier.inputs, amplifier.program, amplifier.cursor);

        amplifiers[perm[permCursor]] = {
            ...result,
            inputs: []
        };

        permCursor = (permCursor + 1) % 5;

        amplifiers[perm[permCursor]].inputs.push(...result.inputs);
    }

    return amplifiers[perm[permCursor]].inputs[0];
});

console.log(Math.max(...values));
