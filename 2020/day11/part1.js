const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const baseLines = data.split("\n").map((line) => line.split(""));

const getSeatState = (lines, x, y) => {
  const line = lines[y];
  if (!line) return ".";

  return line[x] || ".";
};

const countAdjacentOccupiedSeats = (lines, x, y) => {
  return [
    getSeatState(lines, x - 1, y - 1),
    getSeatState(lines, x - 1, y),
    getSeatState(lines, x - 1, y + 1),
    getSeatState(lines, x, y - 1),
    getSeatState(lines, x, y + 1),
    getSeatState(lines, x + 1, y - 1),
    getSeatState(lines, x + 1, y),
    getSeatState(lines, x + 1, y + 1),
  ].reduce((acc, state) => acc + (state === "#" ? 1 : 0), 0);
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
          : adjacentOccupiedSeats >= 4
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
