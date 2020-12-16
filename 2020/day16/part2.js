const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const groups = data.split("\n\n");

const rules = groups[0].split("\n");
const ticketFields = groups[1].split("\n")[1].split(",");
const nearbyTickets = groups[2].split("\n");
nearbyTickets.shift();

const rulesByName = new Map(
  rules.map((rule) => {
    const ranges = [
      ...rule.matchAll(/([\w ]+): (\d+)-(\d+) or (\d+)-(\d+)/g),
    ][0];

    const name = ranges[1];
    const start1 = parseInt(ranges[2], 10);
    const stop1 = parseInt(ranges[3], 10);
    const start2 = parseInt(ranges[4], 10);
    const stop2 = parseInt(ranges[5], 10);

    return [name, [start1, stop1, start2, stop2]];
  })
);

const rulesNames = Array.from(rulesByName.keys());

const isRuleValid = (ruleName, value) => {
  const rule = rulesByName.get(ruleName);
  return (
    (value >= rule[0] && value <= rule[1]) ||
    (value >= rule[2] && value <= rule[3])
  );
};

const validRulesByFields = ticketFields.map((_) => rulesNames.slice());
const ruleNameFound = [];

while (ruleNameFound.length < rulesNames.length) {
  for (const nearbyTicket of nearbyTickets) {
    const nearbyTicketFields = nearbyTicket.split(",");

    for (const [index, field] of nearbyTicketFields.entries()) {
      if (validRulesByFields[index].length === 1) continue;

      const value = parseInt(field, 10);
      const updatedValidRules = validRulesByFields[index].filter(
        (ruleName) =>
          isRuleValid(ruleName, value) && !ruleNameFound.includes(ruleName)
      );

      if (updatedValidRules.length > 0)
        validRulesByFields[index] = updatedValidRules;

      if (updatedValidRules.length === 1)
        ruleNameFound.push(updatedValidRules[0]);
    }
  }
}

const answer = validRulesByFields.reduce(
  (acc, rules, field) =>
    rules[0].startsWith("departure") ? acc * ticketFields[field] : acc,
  1
);

console.log(answer);
