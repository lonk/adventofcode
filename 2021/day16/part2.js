const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const paquet = data
  .split("")
  .map((hex) => parseInt(hex, 16).toString(2).padStart(4, 0))
  .join("");

const computeOperatorValue = (typeId, values) => {
  switch (typeId) {
    case 0:
      return values.reduce((acc, value) => acc + value, 0);
    case 1:
      return values.reduce((product, value) => product * value, 1);
    case 2:
      return Math.min(...values);
    case 3:
      return Math.max(...values);
    case 5:
      return values[0] > values[1] ? 1 : 0;
    case 6:
      return values[0] < values[1] ? 1 : 0;
    case 7:
      return values[0] === values[1] ? 1 : 0;
  }
};

const parsePaquet = (paquet, limit) => {
  let iterations = 0;
  let cursor = 0;
  let versionsSum = 0;
  const values = [];

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
      values.push(parseInt(value, 2));
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
        const { versionsSum: sum, values: subPaquetsValues } =
          parsePaquet(subPaquets);
        versionsSum += sum;
        values.push(computeOperatorValue(typeId, subPaquetsValues));
      } else if (lengthTypeId === "1") {
        const subPaquetsNumber = parseInt(
          paquet.substring(cursor, cursor + 11),
          2
        );
        cursor += 11;

        const subPaquets = paquet.substring(cursor);
        const {
          versionsSum: sum,
          length,
          values: subPaquetsValues,
        } = parsePaquet(subPaquets, subPaquetsNumber);
        versionsSum += sum;
        cursor += length;
        values.push(computeOperatorValue(typeId, subPaquetsValues));
      }
    }

    versionsSum += version;
    iterations += 1;
  }

  return { versionsSum, length: cursor, values };
};

console.log(parsePaquet(paquet).values[0]);
