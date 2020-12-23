const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const initialCircle = data.split("").map((cup) => parseInt(cup, 10));

const computeDestinationIndex = (cup, remainingCups) => {
  let cupToTry = cup;

  while (true) {
    cupToTry =
      cupToTry <= Math.min(...remainingCups)
        ? Math.max(...remainingCups)
        : cupToTry - 1;

    if (remainingCups.includes(cupToTry)) {
      return remainingCups.indexOf(cupToTry);
    }
  }
};

const playRound = (circle, cup) => {
  const index = circle.indexOf(cup);

  const pickup = [...circle, ...circle].slice(index + 1, index + 4);
  const remainingCups = circle.filter((cup) => !pickup.includes(cup));
  const destinationIndex = computeDestinationIndex(cup, remainingCups);

  const newCircle = remainingCups.slice();
  newCircle.splice(destinationIndex + 1, 0, ...pickup);

  const cupIndexInNewCircle = newCircle.indexOf(cup);
  const nextCup = newCircle[cupIndexInNewCircle + 1] || newCircle[0];

  return {
    circle: newCircle,
    nextCup,
  };
};

const formatResult = (circle) => {
  const startIndex = circle.indexOf(1);

  return [...circle, ...circle]
    .slice(startIndex + 1, startIndex + circle.length)
    .join("");
};

let circle = initialCircle.slice();
let nextCup = initialCircle[0];
for (let turn = 0; turn < 100; turn += 1) {
  const result = playRound(circle, nextCup);
  circle = result.circle;
  nextCup = result.nextCup;
}

console.log(formatResult(circle));
