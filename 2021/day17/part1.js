const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const [xStrRange, yStrRange] = data.replace("target area: ", "").split(", ");
const xRange = xStrRange.replace("x=", "").split("..").map(Number);
const yRange = yStrRange.replace("y=", "").split("..").map(Number);

const closestX = Math.min(...xRange);

// We use 1 + 2 + 3 + 4 + ... = n(n+1) / 2
const computeXVelocity = (target) => {
  const discriminant = 1 + 8 * target;
  const result = (Math.sqrt(discriminant) - 1) / 2;

  return Math.ceil(result);
};

const isVelocityCorrect = (velocity, yRange) => {
  let y = 0;
  let updatedVelocity = velocity;

  while (updatedVelocity > 0 || y > yRange[0] || y > yRange[1]) {
    y += updatedVelocity;
    updatedVelocity -= 1;

    if (y >= Math.min(...yRange) && y <= Math.max(...yRange)) return true;
  }
};

const computeYVelocity = (yRange) => {
  for (let velocity = 1000; true; velocity -= 1) {
    if (isVelocityCorrect(velocity, yRange)) return velocity;
  }
};

const xVelocity = computeXVelocity(closestX);
const yVelocity = computeYVelocity(yRange);

const result = (yVelocity * (yVelocity + 1)) / 2;

console.log(xVelocity, yVelocity);
console.log(result);
