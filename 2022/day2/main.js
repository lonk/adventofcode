const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const rounds = data.split("\n");

// A : rock
// B : paper
// C : scissors

const computeScore = round => {
    const [opponentDraw, draw] = round.split(' ');

    switch (draw) {
        case 'X':
            return 1 + (opponentDraw === 'A' ? 3 : opponentDraw === 'B' ? 0 : 6);
        case 'Y':
            return 2 + (opponentDraw === 'A' ? 6 : opponentDraw === 'B' ? 3 : 0);
        case 'Z':
            return 3 + (opponentDraw === 'A' ? 0 : opponentDraw === 'B' ? 6 : 3);
    }
}

const part1 = () => {
    const score = rounds.map(computeScore).reduce((acc, score) => acc + score, 0);
    
    return score;
};

const computeScorePart2 = round => {
    const [opponentDraw, result] = round.split(' ');

    switch (result) {
        case 'X':
            return opponentDraw === 'A' ? 3 : opponentDraw === 'B' ? 1 : 2;
        case 'Y':
            return 3 + (opponentDraw === 'A' ? 1 : opponentDraw === 'B' ? 2 : 3);
        case 'Z':
            return 6 + (opponentDraw === 'A' ? 2 : opponentDraw === 'B' ? 3 : 1);
    }
}

const part2 = () => {
    const score = rounds.map(computeScorePart2).reduce((acc, score) => acc + score, 0);
    
    return score;
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
