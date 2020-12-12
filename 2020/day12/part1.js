const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const instructions = data.split("\n").map((line) => line.split(""));

const directions = ["E", "S", "W", "N"];

const computeNewDirection = (action, currentDirection, degrees) => {
  const currentIndex = directions.indexOf(currentDirection);
  switch (action) {
    case "L": {
      const nextIndex = (currentIndex - degrees / 90 + 4) % 4;
      return directions[nextIndex];
    }
    case "R": {
      const nextIndex = (currentIndex + degrees / 90 + 4) % 4;
      return directions[nextIndex];
    }
    default:
      throw new Error("Invalid action.");
  }
};

const formatInstruction = (instruction) => {
  [action, ...value] = instruction;

  return {
    action,
    value: parseInt(value.join(""), 10),
  };
};

const computeInstruction = (coordinates, instruction) => {
  const [x, y, direction] = coordinates;
  const { action, value } = formatInstruction(instruction);
  switch (action.replace("F", direction)) {
    case "N":
      return [x, y + value, direction];
    case "S":
      return [x, y - value, direction];
    case "E":
      return [x + value, y, direction];
    case "W":
      return [x - value, y, direction];
    case "L":
    case "R":
      return [x, y, computeNewDirection(action, direction, value)];
    default:
      throw new Error("Invalid action.");
  }
};

const computeShipManhattanDistance = () => {
  const coordinates = instructions.reduce(
    (currentCoordinates, instruction) =>
      computeInstruction(currentCoordinates, instruction),
    [0, 0, "E"]
  );

  return Math.abs(coordinates[0]) + Math.abs(coordinates[1]);
};

console.log(computeShipManhattanDistance());
