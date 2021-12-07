const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const crabsCoordinates = data.split(",").map(Number);

const minPosition = Math.min(...crabsCoordinates);
const maxPosition = Math.max(...crabsCoordinates);

let smallestValue = +Infinity;
for (let checkedPosition = minPosition; checkedPosition <= maxPosition; checkedPosition += 1) {
    const totalFuel = crabsCoordinates.reduce((acc, crabCoordinate) => {
        return acc + Math.abs(crabCoordinate - checkedPosition);
    }, 0);

    if (totalFuel < smallestValue) smallestValue = totalFuel;
}

console.log(smallestValue);
