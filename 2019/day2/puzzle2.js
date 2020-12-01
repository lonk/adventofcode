const fs = require('fs');

const data = fs.readFileSync('day2.data', { encoding: 'utf-8' });

const compute = (noun, verb) => {
    const program = data.split(',').map(value => parseInt(value, 10));

    program[1] = noun;
    program[2] = verb;

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

    return program[0];
};

for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
        const computed = compute(noun, verb);

        if (computed === 19690720) {
            console.log(100 * noun + verb);

            noun = 100;
            break;
        }
    }
}