const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const rucksacks = data.split("\n");
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const computePriority = rucksack => {
    const leftPart = rucksack.slice(0, rucksack.length / 2);
    const rightPart = rucksack.slice(rucksack.length / 2, rucksack.length);

    for (const item of leftPart.split('')) {
        const index = rightPart.indexOf(item);

        if (index === -1) continue;

        return alphabet.indexOf(item) + 1;
    }
};

const part1 = () => {
    return rucksacks.reduce((acc, rucksack) => acc + computePriority(rucksack), 0);
};

const computeBadgePriority = (rucksack1, rucksack2, rucksack3) => {
    for (const item of rucksack1.split('')) {
        const index2 = rucksack2.indexOf(item);
        const index3 = rucksack3.indexOf(item);

        if (index2 === -1 || index3 === -1) continue;

        return alphabet.indexOf(item) + 1;
    }
};

const part2 = () => {
    return rucksacks.reduce((acc, rucksack, index) => {
        if (index % 3 !== 0) return acc;

        return acc + computeBadgePriority(rucksack, rucksacks[index + 1], rucksacks[index + 2]);
    }, 0);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
