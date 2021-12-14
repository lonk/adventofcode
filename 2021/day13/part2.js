const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const [lines, instructions] = data.split("\n\n");

const initialDots = lines.split("\n");

let dots = initialDots;
for (const instruction of instructions.split("\n")) {
  const [axis, value] = instruction.replace("fold along ", "").split("=");
  const foldOn = parseInt(value, 10);

  const updatedDots = new Set(
    dots.map((dot) => {
      const [x, y] = dot.split(",").map(Number);

      const distanceFromFold = (axis === "x" ? x : y) - foldOn;

      if (distanceFromFold <= 0) return dot;

      return axis === "x"
        ? `${x - distanceFromFold * 2},${y}`
        : `${x},${y - distanceFromFold * 2}`;
    })
  );

  dots = Array.from(updatedDots);
}

const biggestX = Math.max(
  ...dots.map((dot) => parseInt(dot.split(",")[0], 10))
);
const biggestY = Math.max(
  ...dots.map((dot) => parseInt(dot.split(",")[1], 10))
);
const map = new Set(dots);

for (let y = 0; y <= biggestY; y += 1) {
  for (let x = 0; x <= biggestX; x += 1) {
    process.stdout.write(map.has(`${x},${y}`) ? "#" : ".");
  }
  console.log('');
}
