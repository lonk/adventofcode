const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const instructions = data.split("\n");

const processInstruction = (index, accumulator) => {
  const instruction = instructions[index].split(" ");
  const operation = instruction[0];
  const argument = parseInt(instruction[1], 10);

  let nextIndex = index;
  let nextAccumulator = accumulator;
  switch (operation) {
    case "acc":
      nextIndex += 1;
      nextAccumulator += argument;
      break;
    case "jmp":
      nextIndex += argument;
      break;
    case "nop":
      nextIndex += 1;
      break;
    default:
      throw new Error("Unknown operation");
  }

  return {
    nextIndex,
    nextAccumulator,
  };
};

const isDuplicateInArray = (array) => new Set(array).size !== array.length;

const findInfiniteLoop = (index = 0, accumulator = 0, indexes = []) => {
  const nextIndexes = [...indexes, index];

  if (isDuplicateInArray(nextIndexes)) return accumulator;

  const { nextIndex, nextAccumulator } = processInstruction(index, accumulator);

  return findInfiniteLoop(nextIndex, nextAccumulator, nextIndexes);
};

console.log(findInfiniteLoop());
