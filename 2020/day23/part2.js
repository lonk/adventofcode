const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const initialCircle = data.split("").map((cup) => parseInt(cup, 10));
const initialNeighbours = new Map();
const mapSize = 1000000;
for (let i = 0; i < mapSize; i += 1) {
  initialNeighbours.set(
    initialCircle[i] || i + 1,
    initialCircle[i + 1] || (i === mapSize - 1 ? initialCircle[0] : i + 2)
  );
}

const computeDestination = (neighbours, cup, pickup) => {
  let cupToTry = cup;
  while (true) {
    cupToTry = cupToTry <= 1 ? neighbours.size : cupToTry - 1;

    if (!pickup.includes(cupToTry)) {
      return cupToTry;
    }
  }
};

const formatResult = (neighbours) =>
  neighbours.get(1) * neighbours.get(neighbours.get(1));

let cup = initialCircle[0];
let neighbours = initialNeighbours;
for (let turn = 0; turn < 10000000; turn += 1) {
  const pickup = [
    neighbours.get(cup),
    neighbours.get(neighbours.get(cup)),
    neighbours.get(neighbours.get(neighbours.get(cup))),
  ];

  const destination = computeDestination(neighbours, cup, pickup);
  
  neighbours.set(cup, neighbours.get(pickup[2]));
  neighbours.set(pickup[2], neighbours.get(destination));
  neighbours.set(destination, pickup[0]);

  cup = neighbours.get(cup);
}

console.log(formatResult(neighbours));
