const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const groups = data.split("\n\n");

const computeGroupCount = (group) => {
  const nbPeopleInsideGroup = group.split("\n").length;
  const groupOneLined = group.split(/\n|/g);

  const questionsAnsweredTimes = new Map();
  let questionsAnsweredByEveryoneCount = 0;

  for (const questionAnswered of groupOneLined) {
    const questionAnsweredTimes =
      (questionsAnsweredTimes.get(questionAnswered) || 0) + 1;

    questionsAnsweredTimes.set(questionAnswered, questionAnsweredTimes);

    if (questionAnsweredTimes === nbPeopleInsideGroup) {
      questionsAnsweredByEveryoneCount += 1;
    }
  }

  return questionsAnsweredByEveryoneCount;
};

const sumOfGroupsCount = groups
  .map(computeGroupCount)
  .reduce((acc, groupCount) => acc + groupCount, 0);

console.log(sumOfGroupsCount);
