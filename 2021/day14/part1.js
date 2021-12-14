const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const [initialPolymer, rules] = data.split("\n\n");

const changes = new Map(
  rules.split("\n").map((rule) => {
    const [input, output] = rule.split(" -> ");

    return [input, `${output}${input.charAt(1)}`];
  })
);

let polymer = initialPolymer;

for (let i = 0; i < 10; i += 1) {
    let updatedPolymer = polymer.charAt(0);

    for (let char = 1; char < polymer.length; char += 1) {
        updatedPolymer += changes.get(`${polymer.charAt(char - 1)}${polymer.charAt(char)}`)
    }

    polymer = updatedPolymer;
}

const letters = Array.from(new Set(polymer.split('')));

const occurences = letters.map(letter => polymer.match(new RegExp(letter, 'g')).length);

console.log(Math.max(...occurences) - Math.min(...occurences));