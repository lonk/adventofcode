const fs = require('fs');

const data = fs.readFileSync('day16.data', { encoding: 'utf-8' });

const offset = parseInt(data.slice(0, 7), 10);

const inputList = data.repeat(10000).split('').map(value => parseInt(value, 10)).slice(offset);

const basePattern = [0, 1, 0, -1];
const input = inputList;

for (let phase = 0; phase < 100; phase++) {
    for (let cursor = inputList.length - 1; cursor >= 0; cursor--) {
        input[cursor] = Math.abs(
            (cursor === inputList.length - 1 ? input[cursor] : input[cursor] + input[cursor + 1])
         % 10);
    }
}

console.log(input.join('').slice(0, 8));
