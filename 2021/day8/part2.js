const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const entries = data.split("\n");

const sortString = (string) =>
  string
    .split("")
    .sort((a, b) => a.localeCompare(b))
    .join("");

const computeTranslationTable = (inputDigits) => {
  const seven = inputDigits.find((digits) => digits.length === 3);
  const one = inputDigits.find((digits) => digits.length === 2);
  const four = inputDigits.find((digits) => digits.length === 4);
  const eight = inputDigits.find((digits) => digits.length === 7);
  const three = inputDigits.find(
    (digits) =>
      digits.length === 5 &&
      new Set([...one.split(""), ...digits.split("")]).size === digits.length
  );
  const six = inputDigits.find(
    (digits) =>
      digits.length === 6 &&
      ((digits.indexOf(one.charAt(0)) > -1 &&
        digits.indexOf(one.charAt(1)) === -1) ||
        (digits.indexOf(one.charAt(1)) > -1 &&
          digits.indexOf(one.charAt(0)) === -1))
  );
  const nine = inputDigits.find(
    (digits) =>
      digits.length === 6 &&
      new Set([...four.split(""), ...digits.split("")]).size === digits.length
  );
  const zero = inputDigits.find(
    (digits) => digits.length === 6 && digits !== nine && digits !== six
  );
  const five = inputDigits.find(
    (digits) =>
      digits.length === 5 &&
      new Set([...six.split(""), ...digits.split("")]).size ===
        digits.length + 1
  );
  const two = inputDigits.find(
    (digits) => digits.length === 5 && digits !== five && digits !== three
  );

  const translationTable = new Map([
    [sortString(zero), 0],
    [sortString(one), 1],
    [sortString(two), 2],
    [sortString(three), 3],
    [sortString(four), 4],
    [sortString(five), 5],
    [sortString(six), 6],
    [sortString(seven), 7],
    [sortString(eight), 8],
    [sortString(nine), 9],
  ]);

  return translationTable;
};

const result = entries.reduce((acc, entry) => {
  const [input, output] = entry.split(" | ");
  const inputDigits = input.split(" ");

  const translationTable = computeTranslationTable(inputDigits);

  const sortedOutput = output
    .split(" ")
    .map((digits) => translationTable.get(sortString(digits)));

  return acc + parseInt(sortedOutput.join(""), 10);
}, 0);

console.log(result);
