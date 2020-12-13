const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const buses = lines[1]
  .split(",")
  .map((bus) => (bus === "x" ? bus : parseInt(bus, 10)));
const interval = Math.max(...buses.filter((bus) => bus !== "x"));
const start = interval - buses.indexOf(interval);
let answer;

for (let cursor = start; !answer; cursor += interval) {
  let valid = true;
  for (const [index, bus] of buses.entries()) {
    const subCursor = cursor + index;

    if (bus === "x") continue;

    if (subCursor % bus !== 0) {
      valid = false;
      break;
    }
  }

  if (valid) answer = cursor;
}

console.log(answer);
