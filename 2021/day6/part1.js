const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const fishes = data.split(",").map(Number);

const blankFishesByTimer = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
  [6, 0],
  [7, 0],
  [8, 0],
];

let fishesByTimer = new Map(blankFishesByTimer);

for (const fish of fishes) {
  fishesByTimer.set(fish, fishesByTimer.get(fish) + 1);
}

const generateNextDay = (fishesByTimer) => {
  const updatedFishesByTimer = new Map(blankFishesByTimer);

  for (let timer = 0; timer <= 8; timer += 1) {
    const currentFishesAtTimer = fishesByTimer.get(timer);

    if (timer === 0) {
      updatedFishesByTimer.set(
        6,
        updatedFishesByTimer.get(6) + currentFishesAtTimer
      );
      updatedFishesByTimer.set(8, currentFishesAtTimer);
      continue;
    }

    updatedFishesByTimer.set(
      timer - 1,
      updatedFishesByTimer.get(timer - 1) + currentFishesAtTimer
    );
  }

  return updatedFishesByTimer;
};

for (let day = 1; day <= 80; day += 1) {
  fishesByTimer = generateNextDay(fishesByTimer);
}

console.log(
  Array.from(fishesByTimer.values()).reduce((acc, fish) => acc + fish, 0)
);
