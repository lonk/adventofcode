const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const earliestTimestamp = parseInt(lines[0], 10);
const buses = lines[1].split(",").filter((bus) => bus !== "x");

let result, shortestTimeToWait;

for (const bus of buses) {
  const busId = parseInt(bus, 10);
  const timeToWait =
    Math.ceil(earliestTimestamp / busId) * busId - earliestTimestamp;

  if (shortestTimeToWait && shortestTimeToWait < timeToWait) continue;

  shortestTimeToWait = timeToWait;
  result = busId * timeToWait;
}

console.log(result);
