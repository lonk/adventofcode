const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const pairs = data.split("\n");

const setFromRange = range => {
    const [start, end] = range.split('-').map(entry => parseInt(entry, 10));

    return new Set(Array.from(Array(end - start + 1).keys()).map(entry => entry + start));
};

const part1 = () => {
    return pairs.reduce((acc, pair) => {
        const [firstElf, secondElf] = pair.split(',');

        const firstElfSet = setFromRange(firstElf);
        const secondElfSet = setFromRange(secondElf);

        const overlap = new Set([...firstElfSet, ...secondElfSet]);

        if (overlap.size !== Math.max(firstElfSet.size, secondElfSet.size)) return acc;

        return acc + 1;
    }, 0);
};

const part2 = () => {
    return pairs.reduce((acc, pair) => {
        const [firstElf, secondElf] = pair.split(',');

        const firstElfSet = setFromRange(firstElf);
        const secondElfSet = setFromRange(secondElf);

        const overlap = new Set([...firstElfSet, ...secondElfSet]);

        if (overlap.size === firstElfSet.size + secondElfSet.size) return acc;

        return acc + 1;
    }, 0);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());