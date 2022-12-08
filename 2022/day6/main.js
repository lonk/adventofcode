const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const stream = data;

const part1 = () => {
    for (let cursor = 0; cursor += 1; cursor < stream.length) {
        const subset = new Set(stream.slice(cursor, cursor + 4));

        if (subset.size === 4) return cursor + 4;
    }
};

const part2 = () => {
    for (let cursor = 0; cursor += 1; cursor < stream.length) {
        const subset = new Set(stream.slice(cursor, cursor + 14));

        if (subset.size === 14) return cursor + 14;
    }
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
