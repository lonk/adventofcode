const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const baseLines = data.split("\n").map((line) => line.split(""));

const getSeatState = (lines, x, y) => {
  const line = lines[y];
  if (!line) return "L";

  return line[x] || "L";
};

const getDirectionState = (lines, direction, x, y) => {
  let seat = ".";
  for (let multiplier = 1; seat === "."; multiplier++) {
    seat = getSeatState(
      lines,
      x + multiplier * direction[0],
      y + multiplier * direction[1]
    );
  }

  return seat;
};

const countAdjacentOccupiedSeats = (lines, x, y) => {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  return directions
    .map((direction) => getDirectionState(lines, direction, x, y))
    .reduce((acc, state) => acc + (state === "#" ? 1 : 0), 0);
};

const iterate = (lines) => {
  const newLines = [];
  let hasChanged = false;
  let seatsOccupied = 0;

  for (const [y, line] of lines.entries()) {
    const newLine = [];
    for (const [x, seat] of line.entries()) {
      if (seat === ".") {
        newLine.push(seat);
        continue;
      }

      const adjacentOccupiedSeats = countAdjacentOccupiedSeats(lines, x, y);
      const newSeat =
        adjacentOccupiedSeats === 0
          ? "#"
          : adjacentOccupiedSeats >= 5
          ? "L"
          : seat;

      if (seat !== newSeat) hasChanged = true;
      if (newSeat === "#") seatsOccupied += 1;

      newLine.push(newSeat);
    }
    newLines.push(newLine);
  }

  return hasChanged ? iterate(newLines) : seatsOccupied;
};

console.log(iterate(baseLines));
