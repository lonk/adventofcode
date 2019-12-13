const fs = require('fs');

const data = fs.readFileSync('day7.data', { encoding: 'utf-8' });

const compute = inputs => {
    const program = data.split(',').map(value => parseInt(value, 10));

    let cursor = 0;
    let cursorInput = 0;

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
                input = inputs[cursorInput];
                program[param1] = input;

                cursor += 2;
                cursorInput++;
                break;
            case 4:
                console.log('Output:', paramValue1);
                return paramValue1;

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
                console.log('Opcode 99');
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

const permutations = permute([0, 1, 2, 3, 4]);

const values = permutations.map(perm => {
    const firstAmp = compute([perm[0], 0]);
    const secondAmp = compute([perm[1], firstAmp]); 
    const thirdAmp = compute([perm[2], secondAmp]);
    const fourthAmp = compute([perm[3], thirdAmp]);
    const fifthAmp = compute([perm[4], fourthAmp]);

    return fifthAmp;
});

console.log(Math.max(...values));

