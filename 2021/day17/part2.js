const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const [xStrRange, yStrRange] = data.replace("target area: ", "").split(", ");
const xRange = xStrRange.replace("x=", "").split("..").map(Number);
const yRange = yStrRange.replace("y=", "").split("..").map(Number);

const closestX = Math.min(...xRange);
const farthestX = Math.max(...xRange);

const range = (from, to) =>
  Array.from({ length: to - from + 1 }, (_) => from++);

// We use 1 + 2 + 3 + 4 + ... = n(n+1) / 2
const computeXVelocity = (target) => {
  const discriminant = 1 + 8 * target;
  const result = (Math.sqrt(discriminant) - 1) / 2;

  return Math.ceil(result);
};

const isVelocityCorrect = (
  initialXVelocity,
  initialYVelocity,
  xRange,
  yRange
) => {
  let x = 0;
  let y = 0;
  let xVelocity = initialXVelocity;
  let yVelocity = initialYVelocity;

  while (yVelocity > 0 || y > yRange[0] || y > yRange[1]) {
    x += xVelocity;
    y += yVelocity;
    xVelocity = Math.max(0, xVelocity - 1);
    yVelocity -= 1;

    if (
      y >= Math.min(...yRange) &&
      y <= Math.max(...yRange) &&
      x >= Math.min(...xRange) &&
      x <= Math.max(...xRange)
    )
      return true;
  }

  return false;
};

const computeHighestYVelocity = (xVelocity, xRange, yRange) => {
  for (let velocity = 1000; true; velocity -= 1) {
    if (isVelocityCorrect(xVelocity, velocity, xRange, yRange)) return velocity;
  }
};

const xVelocities = range(computeXVelocity(closestX), farthestX);
const highestYVelocity = computeHighestYVelocity(
  xVelocities[0],
  xRange,
  yRange
);
const yVelocities = range(Math.min(...yRange), highestYVelocity);

const validVelocities = xVelocities
  .flatMap((xVelocity) =>
    yVelocities.flatMap((yVelocity) =>
      isVelocityCorrect(xVelocity, yVelocity, xRange, yRange)
    )
  )
  .filter((isValid) => isValid === true);

console.log(validVelocities.length);
