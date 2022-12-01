const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const computeElvesTotalCalories = () => {
    let elf = 0;
    const elves = [];

    for (const line of lines) {
        if (line === '') {
            elf += 1;
            continue;
        }
        
        elves[elf] = (elves[elf] ?? 0) + parseInt(line, 10);
    }

    return elves;
}

const part1 = () => {
    const elves = computeElvesTotalCalories();

    return Math.max(...elves);
};

const part2 = () => {
    const elves = computeElvesTotalCalories();

    const sortedElves = elves.slice().sort((left, right) => right - left);

    return sortedElves[0] + sortedElves[1] + sortedElves[2];
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
