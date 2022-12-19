const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const monkeysList = data.split("\n\n");

const computeOperation = rawOperation => {
    const parsedOperation = rawOperation.replace('  Operation: new = old ', '');

    if (parsedOperation.slice(2) !== 'old') {
        const operationCoef = parseInt(parsedOperation.slice(2), 10);

        return parsedOperation.charAt(0) === '*' ? (old => old * operationCoef) : (old => old + operationCoef);
    }

    return parsedOperation.charAt(0) === '*' ? (old => old * old) : (old => old + old);
};

const computeTest = (rawTest, ifTrue, ifFalse) => {
    const div = parseInt(rawTest.replace('  Test: divisible by ', ''), 10);
    const throwToIfTrue = parseInt(ifTrue.replace('    If true: throw to monkey ', ''), 10);
    const throwToIfFalse = parseInt(ifFalse.replace('    If false: throw to monkey ', ''), 10);

    return { test: value => (value % div === 0) ? throwToIfTrue : throwToIfFalse, div };
};

const parseMonkey = monkey => {
    const [_, rawItems, rawOperation, rawTest, ifTrue, ifFalse] = monkey.split("\n");
    const items = rawItems.split(': ')[1].split(', ').map(Number);
    
    return {
        items,
        operation: computeOperation(rawOperation),
        ...computeTest(rawTest, ifTrue, ifFalse),
        inspections: 0
    };
};

const parseMonkeys = () => monkeysList.map(parseMonkey);

const part1 = () => {
    const monkeys = parseMonkeys();

    for (let round = 1; round <= 20; round += 1) {
        for (const monkey of monkeys) {
            while (monkey.items.length > 0) {
                const currentItem = monkey.items.shift();

                const newWorry = Math.floor(monkey.operation(currentItem) / 3);

                const throwTo = monkey.test(newWorry);

                monkeys[throwTo].items.push(newWorry);

                monkey.inspections += 1;
            }
        }
    }

    const sortedMonkeys = monkeys.slice().sort((left, right) => right.inspections - left.inspections);

    return sortedMonkeys[0].inspections * sortedMonkeys[1].inspections;
};

const computeModulo = monkeys => monkeys.reduce((acc, monkey) => acc * monkey.div, 1);

const part2 = () => {
    const monkeys = parseMonkeys();
    const modulo = computeModulo(monkeys);

    for (let round = 1; round <= 10000; round += 1) {
        for (const monkey of monkeys) {
            while (monkey.items.length > 0) {
                const currentItem = monkey.items.shift();

                // Théorème des restes chinois
                const newWorry = monkey.operation(currentItem) % modulo;

                const throwTo = monkey.test(newWorry);

                monkeys[throwTo].items.push(newWorry);

                monkey.inspections += 1;
            }
        }
    }

    const sortedMonkeys = monkeys.slice().sort((left, right) => right.inspections - left.inspections);

    return sortedMonkeys[0].inspections * sortedMonkeys[1].inspections;
};

console.log('Part 1 :', part1());
console.log('Part 2 :', part2());
