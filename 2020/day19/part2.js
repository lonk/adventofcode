const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" })
  .replace("8: 42", "8: 42 | 42 8")
  .replace("11: 42 31", "11: 42 31 | 42 11 31");

const [rules, inputs] = data
  .split("\n\n")
  .map((entries) => entries.split("\n"));

const rulesByIdentifier = new Map(
  rules.map((rule) => {
    const [identifier, combinations] = rule.split(": ");

    if (combinations.split('"').length === 3) {
      return [identifier, [[combinations.split('"')[1]]]];
    }

    const parsedCombinations = combinations
      .split(" | ")
      .map((entry) => entry.split(" "));

    return [identifier, parsedCombinations];
  })
);

const computeRegexpRule = (identifier = "0") => {
  const rule = rulesByIdentifier.get(identifier);
  const regexpSubGroups = rule.map((subGroup) => {
    const isInfiniteLoop = subGroup.includes(identifier);

    // Can't simply be to add "+" on each side: will match to many answers
    // Would be possible to use matching groups too & extract to compare if length of group11 = number of a * 2
    return `(${(isInfiniteLoop ? [1, 2, 3, 4, 5] : [1])
      .map((i) =>
        [
          ...subGroup
            .filter((subIdentifier) => subIdentifier !== identifier)
            .map((subIdentifier) =>
              isNaN(subIdentifier)
                ? subIdentifier
                : computeRegexpRule(subIdentifier)
            ),
          "",
        ].join(`{${i}}`)
      )
      .join("|")})`;
  });
  return `(${regexpSubGroups.join("|")})`;
};

const regexp = new RegExp(`\\b${computeRegexpRule()}\\b`, "g");

const validInputs = inputs.reduce(
  (acc, input) => (input.match(regexp) ? acc + 1 : acc),
  0
);

console.log(validInputs);
