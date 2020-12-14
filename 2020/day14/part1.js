const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");
const memory = new Map();
let currentMask;

const applyMask = (mask, binaryString) =>
  mask
    .split("")
    .map((maskBit, index) =>
      maskBit === "X" ? binaryString.charAt(index) : maskBit
    )
    .join("");

for (const line of lines) {
  if (line.startsWith("mask = ")) {
    currentMask = line.split(" = ")[1];
    continue;
  }

  const found = [...line.matchAll(/mem\[(\d+)\] = (\d+)/g)][0];
  const address = parseInt(found[1], 10);
  const value = parseInt(found[2], 10);
  const binaryString = value.toString(2).padStart(36, 0);

  const maskedBinaryString = applyMask(currentMask, binaryString);

  memory.set(address, parseInt(maskedBinaryString, 2));
}

console.log(Array.from(memory.values()).reduce((acc, value) => acc + value, 0));
