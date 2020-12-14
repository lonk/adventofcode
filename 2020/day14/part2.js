const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");
const memory = new Map();
let currentMask;

const applyMask = (mask, binaryString) =>
  mask
    .split("")
    .map((maskBit, index) =>
      maskBit === "0" ? binaryString.charAt(index) : maskBit
    )
    .join("");

const computeAddresses = (binaryString) => {
  const firstIndex = binaryString.indexOf("X");

  if (firstIndex === -1) return [binaryString];

  const subBinaryString1 = binaryString.split("").slice();
  const subBinaryString2 = binaryString.split("").slice();
  subBinaryString1.splice(firstIndex, 1, "0");
  subBinaryString2.splice(firstIndex, 1, "1");

  return [
    ...computeAddresses(subBinaryString1.join("")),
    ...computeAddresses(subBinaryString2.join("")),
  ];
};

for (const line of lines) {
  if (line.startsWith("mask = ")) {
    currentMask = line.split(" = ")[1];
    continue;
  }

  const found = [...line.matchAll(/mem\[(\d+)\] = (\d+)/g)][0];
  const address = parseInt(found[1], 10);
  const value = parseInt(found[2], 10);

  const binaryString = address.toString(2).padStart(36, 0);
  const maskedBinaryString = applyMask(currentMask, binaryString);
  const addresses = computeAddresses(maskedBinaryString);

  for (const newAdress of addresses) {
    memory.set(newAdress, value);
  }
}

console.log(Array.from(memory.values()).reduce((acc, value) => acc + value, 0));
