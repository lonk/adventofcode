const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const groups = data.split("\n\n");

const computeGroupCount = (group) => {
  const groupOneLined = group.split(/\n|/g);

  const questionsAnswered = new Map();

  for (const questionAnswered of groupOneLined) {
    questionsAnswered.set(questionAnswered, true);
  }

  return questionsAnswered.size;
};

const sumOfGroupsCount = groups
  .map(computeGroupCount)
  .reduce((acc, groupCount) => acc + groupCount, 0);

console.log(sumOfGroupsCount);
