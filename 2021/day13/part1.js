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
  break;
}

console.log(dots.length);
