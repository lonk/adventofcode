const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const bagsCanBeHoldedBy = new Map();

for (const line of lines) {
  const splittedLine = line.split(" bags contain ");
  if (splittedLine[1] === "no other bags.") continue;

  const bag = splittedLine[0];
  const content = splittedLine[1]
    .split(/ bags, | bag, | bag\.| bags\./g)
    .map((entry) => {
      [first, ...rest] = entry.split(" ");
      return rest.join(" ");
    });
  content.pop();

  for (const entry of content) {
    const bagCanBeHoldedBy = (bagsCanBeHoldedBy.get(entry) || []).concat([bag]);
    bagsCanBeHoldedBy.set(entry, bagCanBeHoldedBy);
  }
}

const computeOccurencies = (holders = []) => {
  const updatedHolders = holders;
  for (const holder of holders) {
    updatedHolders.push(...(bagsCanBeHoldedBy.get(holder) || []));
  }

  if (updatedHolders.length === holders.length) {
    return new Set(holders).size - 1;
  }

  return computeOccurencies(updatedHolders);
};

console.log(computeOccurencies(["shiny gold"]));
