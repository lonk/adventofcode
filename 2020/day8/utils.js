const processInstruction = (instructions, index, accumulator) => {
  const { operation, argument } = instructions[index];

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

const formatInstruction = (instruction) => {
  const splitted = instruction.split(" ");

  return {
    operation: splitted[0],
    argument: parseInt(splitted[1], 10),
  };
};

module.exports = { processInstruction, isDuplicateInArray, formatInstruction };
