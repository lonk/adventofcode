const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const buses = lines[1].split(",");

const n = buses
  .filter((bus) => bus !== "x")
  .reduce((mult, value) => mult * parseInt(value, 10), 1);

// Bruteforce, but we could use Euclid Extended Theorem
const computeModularMultiplicativeInverse = (a, m) => {
  for (let x = 1; x < m; x += 1) {
    if ((a * x) % m === 1) return x;
  }
};

// Using Chinese Remainder Theorem
const answer = buses.reduce((acc, bus, index) => {
  if (bus === "x") return acc;

  const busId = parseInt(bus, 10);
  const negativeRest = (busId - index) % busId;
  const rest = negativeRest < 0 ? negativeRest + busId : negativeRest;

  return (
    acc +
    BigInt(rest) *
      BigInt(
        (n / busId) * computeModularMultiplicativeInverse(n / busId, busId)
      )
  );
}, 0n);

console.log(answer % BigInt(n));
