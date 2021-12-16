const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const [initialPolymer, rules] = data.split("\n\n");

const changes = new Map(
  rules.split("\n").map((rule) => {
    const [input, output] = rule.split(" -> ");

    return [
      input,
      [`${input.charAt(0)}${output}`, `${output}${input.charAt(1)}`],
    ];
  })
);

const splitPolymer = (input) => {
  const polymer = new Map();

  for (let i = 0; i < input.length - 1; i += 1) {
    const fragment = `${input.charAt(i)}${input.charAt(i + 1)}`;

    polymer.set(fragment, (polymer.get(fragment) ?? 0) + 1);
  }

  return polymer;
};

let polymer = splitPolymer(initialPolymer);

for (let i = 0; i < 40; i += 1) {
  const updatedPolymer = new Map();

  for (const [fragment, quantity] of Array.from(polymer.entries())) {
    const [output1, output2] = changes.get(fragment) ?? [];

    updatedPolymer.set(output1, (updatedPolymer.get(output1) ?? 0) + quantity);
    updatedPolymer.set(output2, (updatedPolymer.get(output2) ?? 0) + quantity);
  }

  polymer = updatedPolymer;
}

const lastLetter = initialPolymer.charAt(initialPolymer.length - 1);
const letters = Array.from(
  new Set(Array.from(polymer.keys()).join("").split(""))
);
const occurencesByLetter = new Map(
  letters.map((letter) => [
    letter,
    Array.from(polymer.entries()).reduce((acc, [fragment, quantity]) => {
      if (fragment.charAt(0) !== letter) return acc;

      return acc + quantity;
    }, 0),
  ])
);

occurencesByLetter.set(lastLetter, occurencesByLetter.get(lastLetter) + 1);
const occurences = Array.from(occurencesByLetter.values());

console.log(Math.max(...occurences) - Math.min(...occurences));
