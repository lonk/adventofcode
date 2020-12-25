const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });
const [cardPublicKey, doorPublicKey] = data
  .split("\n")
  .map((publicKey) => parseInt(publicKey, 10));

const transformSubject = (subjectNumber, loops) => {
  let value = 1;

  for (let loop = 0; loop < loops; loop += 1) {
    value = (value * subjectNumber) % 20201227;
  }

  return value;
};

const findPublicKeyLoopSize = (number) => {
  let value = 1;
  let currentLoop = 0;

  while (value !== number) {
    value = (value * 7) % 20201227;
    currentLoop += 1;
  }

  return currentLoop;
};

const doorLoopSize = findPublicKeyLoopSize(doorPublicKey);

const encryptionKey = transformSubject(cardPublicKey, doorLoopSize);

console.log(encryptionKey);
