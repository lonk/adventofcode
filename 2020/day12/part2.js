const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const instructions = data.split("\n").map((line) => line.split(""));

const computeWaypointRotation = (action, degrees, waypoint) => {
  const radians = (Math.PI / 180) * (action === "L" ? degrees : -1 * degrees);
  const distance = Math.sqrt(
    Math.pow(waypoint[0], 2) + Math.pow(waypoint[1], 2)
  );
  const angle = Math.atan2(waypoint[1], waypoint[0]) + radians;

  return [
    Math.round(distance * Math.cos(angle)),
    Math.round(distance * Math.sin(angle)),
  ];
};

const formatInstruction = (instruction) => {
  [action, ...value] = instruction;

  return {
    action,
    value: parseInt(value.join(""), 10),
  };
};

const computeInstruction = (coordinates, instruction) => {
  const { ship, waypoint } = coordinates;
  const { action, value } = formatInstruction(instruction);
  switch (action) {
    case "N":
      return { ship, waypoint: [waypoint[0], waypoint[1] + value] };
    case "S":
      return { ship, waypoint: [waypoint[0], waypoint[1] - value] };
    case "E":
      return { ship, waypoint: [waypoint[0] + value, waypoint[1]] };
    case "W":
      return { ship, waypoint: [waypoint[0] - value, waypoint[1]] };
    case "L":
    case "R":
      return {
        ship,
        waypoint: computeWaypointRotation(action, value, waypoint),
      };
    case "F":
      return {
        ship: [ship[0] + value * waypoint[0], ship[1] + value * waypoint[1]],
        waypoint,
      };
    default:
      throw new Error("Invalid action.");
  }
};

const computeShipManhattanDistance = () => {
  const coordinates = instructions.reduce(
    (currentCoordinates, instruction) =>
      computeInstruction(currentCoordinates, instruction),
    {
      ship: [0, 0],
      waypoint: [10, 1],
    }
  );

  return Math.abs(coordinates.ship[0]) + Math.abs(coordinates.ship[1]);
};

console.log(computeShipManhattanDistance());
