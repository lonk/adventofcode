const { readFileSync } = require("fs");
const {
  formatInstruction,
  processInstruction,
  isDuplicateInArray,
} = require("./utils");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const baseInstructions = data.split("\n").map(formatInstruction);

const findInfiniteLoop = (
  instructions,
  index = 0,
  accumulator = 0,
  indexes = []
) => {
  const nextIndexes = [...indexes, index];

  if (isDuplicateInArray(nextIndexes)) return accumulator;

  const { nextIndex, nextAccumulator } = processInstruction(
    instructions,
    index,
    accumulator
  );

  return findInfiniteLoop(
    instructions,
    nextIndex,
    nextAccumulator,
    nextIndexes
  );
};

console.log(findInfiniteLoop(baseInstructions));
