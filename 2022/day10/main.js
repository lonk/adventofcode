const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const part1 = () => {
    let cycle = 0;
    let x = 1;
    const queueToAdd = [];
    let sum = 0;

    do {
        if (lines[cycle]) {
            const [instruction, value] = lines[cycle].split(' ');

            queueToAdd.push(0);
            if (instruction === 'addx') {
                queueToAdd.push(parseInt(value, 10));
            }
        }

        cycle += 1;
        
        if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
            sum += cycle * x;
        }

        x += queueToAdd.shift() ?? 0;
    } while (queueToAdd.length > 0);

    return sum;
};

const part2 = () => {
    let cycle = 0;
    let x = 1;
    const queueToAdd = [];
    let drawing = '';

    do {
        if (lines[cycle]) {
            const [instruction, value] = lines[cycle].split(' ');

            queueToAdd.push(0);
            if (instruction === 'addx') {
                queueToAdd.push(parseInt(value, 10));
            }
        }

        cycle += 1;

        if ([x - 1, x, x + 1].includes(drawing.length)) {
            drawing += '#';
        } else {
            drawing += '.';
        }

        if (drawing.length === 40) {
            console.log(drawing);
            drawing = '';
        }

        x += queueToAdd.shift() ?? 0;
    } while (queueToAdd.length > 0);
};

console.log('Part 1 :', part1());
console.log('Part 2 :');
part2();
