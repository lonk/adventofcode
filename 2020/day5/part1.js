const { readFileSync } = require("fs");
const { computeSeatId } = require("./utils");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const boardingPasses = data.split("\n");

const higherSeatId = boardingPasses.reduce(
  (higher, boardingPass) => Math.max(computeSeatId(boardingPass), higher),
  0
);

console.log(higherSeatId);
