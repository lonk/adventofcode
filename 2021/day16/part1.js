const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const paquet = data
  .split("")
  .map((hex) => parseInt(hex, 16).toString(2).padStart(4, 0))
  .join("");

const parsePaquet = (paquet, limit) => {
  let iterations = 0;
  let cursor = 0;
  let versionsSum = 0;

  while (
    cursor < paquet.length &&
    (limit === undefined || iterations < limit)
  ) {
    const version = parseInt(paquet.substring(cursor, cursor + 3), 2);
    const typeId = parseInt(paquet.substring(cursor + 3, cursor + 6), 2);
    cursor += 6;

    if (typeId === 4) {
      let value = "";
      while (paquet.charAt(cursor) === "1") {
        value += paquet.substring(cursor + 1, cursor + 5);
        cursor += 5;
      }

      value += paquet.substring(cursor + 1, cursor + 5);
      cursor += 5;
    } else {
      const lengthTypeId = paquet.charAt(cursor);
      cursor += 1;

      if (lengthTypeId === "0") {
        const subPaquetsLength = parseInt(
          paquet.substring(cursor, cursor + 15),
          2
        );

        cursor += 15;

        const subPaquets = paquet.substring(cursor, cursor + subPaquetsLength);
        cursor += subPaquetsLength;
        versionsSum += parsePaquet(subPaquets).versionsSum;
      } else if (lengthTypeId === "1") {
        const subPaquetsNumber = parseInt(
          paquet.substring(cursor, cursor + 11),
          2
        );
        cursor += 11;

        const subPaquets = paquet.substring(cursor);
        const { versionsSum: sum, length } = parsePaquet(subPaquets, subPaquetsNumber);
        versionsSum += sum;
        cursor += length;
      }
    }

    versionsSum += version;
    iterations += 1;
  }

  return { versionsSum, length: cursor };
};

console.log(parsePaquet(paquet).versionsSum);
