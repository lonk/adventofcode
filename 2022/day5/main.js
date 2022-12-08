const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const [config, moves] = data.split("\n\n");

const computeCursor = stackIndex => stackIndex * 4 + 1;

const buildStacks = config => {
    const lines = config.split("\n").slice(0, -1);
    const stacks = [];

    for (const line of lines) {
        let stackIndex = 0;

        while (line.charAt(computeCursor(stackIndex)) !== '') {
            const crate = line.charAt(computeCursor(stackIndex));

            if (crate !== ' ') {
                const currentStack = stacks[stackIndex] ?? [];
                stacks[stackIndex] = [...currentStack, crate];
            }

            stackIndex += 1;
        }
    }

    return stacks;
};

const part1 = () => {
    const stacks = buildStacks(config);

    for (const move of moves.split("\n")) {
        const [_, quantity, __, from, ___, to] = move.split(' ');

        const source = stacks[from - 1];
        const destination = stacks[to - 1];

        const removed = source.splice(0, quantity).reverse();
        stacks[to - 1] = [...removed, ...destination];
    }

    return stacks.map(stack => stack[0]).join('');
};

const part2 = () => {
    const stacks = buildStacks(config);

    for (const move of moves.split("\n")) {
        const [_, quantity, __, from, ___, to] = move.split(' ');

        const source = stacks[from - 1];
        const destination = stacks[to - 1];

        const removed = source.splice(0, quantity);
        stacks[to - 1] = [...removed, ...destination];
    }

    return stacks.map(stack => stack[0]).join('');
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
