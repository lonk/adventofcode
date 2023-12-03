import { readFileSync } from 'fs';

const data = readFileSync('puzzle.data', { encoding: 'utf-8' });

const part1 = () => {
    const lines = data.split('\n');

    let sum = 0;
    for (const line of lines) {
        const lineDigits = line.replace(/\D/g, '');
        sum += parseInt(lineDigits[0] + lineDigits[lineDigits.length - 1], 10);
    }

    console.log(sum);
};

part1();

const part2 = () => {
    const replaceAllNumbers = (line: string): string => {
        const numbers = [
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'nine'
        ];

        let numberIndexToReplace;
        let lowerIndex = +Infinity;

        for (const [numberIndex, number] of numbers.entries()) {
            const lineIndex = line.indexOf(number);

            if (lineIndex === -1) continue;
            else if (lineIndex < lowerIndex) {
                lowerIndex = lineIndex;
                numberIndexToReplace = numberIndex;
            }
        }

        if (numberIndexToReplace === undefined) return line;

        return replaceAllNumbers(
            line.replace(
                numbers[numberIndexToReplace],
                (numberIndexToReplace + 1).toString()
            )
        );
    };

    const lines = data.split('\n');

    let sum = 0;

    for (const line of lines) {
        const lineDigits = replaceAllNumbers(line).replace(/\D/g, '');
        sum += parseInt(lineDigits[0] + lineDigits[lineDigits.length - 1], 10);
    }

    console.log(sum);
};

part2();
