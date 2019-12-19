const fs = require('fs');

const data = fs.readFileSync('day16.data', { encoding: 'utf-8' });

const inputList = data.split('').map(value => parseInt(value, 10));

const basePattern = [0, 1, 0, -1];
let phaseResults;
let input = inputList;

for (let phase = 0; phase < 100; phase++) {
    phaseResults = [];

    for (let cursor = 1; cursor <= inputList.length; cursor++) {
        phaseResults.push(Math.abs(
            input.reduce((a, b, index) => {
                const multiplier = basePattern[Math.floor((index + 1) / cursor) % 4];

                return a + multiplier * b;
            }, 0)
         % 10));
    }

    input = phaseResults;
}

console.log(input.join('').slice(0, 8));
