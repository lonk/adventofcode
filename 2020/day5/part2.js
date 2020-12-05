const { readFileSync } = require("fs");
const { computeSeatId } = require("./utils");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const boardingPasses = data.split("\n");

const seatsIds = boardingPasses.map((boardingPass) =>
  computeSeatId(boardingPass)
);
const sortedSeatsIds = seatsIds.slice().sort((a, b) => a - b);

const missingSeatsIds = sortedSeatsIds.reduce((acc, seatId, index) => {
    const nextSeat = sortedSeatsIds[index + 1];
    if (nextSeat && seatId + 1 !== nextSeat) {
        return [...acc, seatId + 1];
    }
    return acc;
}, []);

console.log(missingSeatsIds[0]);
