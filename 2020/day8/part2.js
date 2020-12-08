const { readFileSync } = require("fs");
const {
  formatInstruction,
  processInstruction,
  isDuplicateInArray,
} = require("./utils");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const baseInstructions = data.split("\n").map(formatInstruction);

const computeAccumulatorIfNotInfinite = (
  instructions,
  index = 0,
  accumulator = 0,
  indexes = []
) => {
  const nextIndexes = [...indexes, index];

  if (isDuplicateInArray(nextIndexes)) return false;
  else if (!instructions[index]) return accumulator;

  const { nextIndex, nextAccumulator } = processInstruction(
    instructions,
    index,
    accumulator
  );

  return computeAccumulatorIfNotInfinite(
    instructions,
    nextIndex,
    nextAccumulator,
    nextIndexes
  );
};

const tryAllSwitches = (instructions) => {
  const indexes = [];

  for (const [index, instruction] of instructions.entries()) {
    if (["nop", "jmp"].includes(instruction.operation)) indexes.push(index);
  }

  for (const index of indexes) {
    const { operation, argument } = instructions[index];

    const updatedInstructions = instructions.slice();
    updatedInstructions.splice(index, 1, {
      operation: operation === "jmp" ? "nop" : "jmp",
      argument,
    });

    const computed = computeAccumulatorIfNotInfinite(updatedInstructions);

    if (computed) return computed;
  }
};

console.log(tryAllSwitches(baseInstructions));
