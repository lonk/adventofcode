const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

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
  const regexpSubGroups = rule.map((subGroup) =>
    subGroup
      .map((identifier) =>
        isNaN(identifier) ? identifier : computeRegexpRule(identifier)
      )
      .join("")
  );
  return `(${regexpSubGroups.join("|")})`;
};

const regexp = new RegExp(`\\b${computeRegexpRule()}\\b`, "g");

const validInputs = inputs.reduce(
  (acc, input) => (input.match(regexp) ? acc + 1 : acc),
  0
);

console.log(validInputs);
