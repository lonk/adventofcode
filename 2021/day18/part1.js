const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const numbers = data.split("\n");

const parseNumber = (number) => {
  if (number.length === 1) return parseInt(number, 10);

  let depth = 0;
  let splitIndex;
  for (const [index, char] of number.split("").entries()) {
    if (char === "[") {
      depth += 1;
      continue;
    }
    if (char === "]") {
      depth -= 1;
      continue;
    }

    if (char === "," && depth === 1) {
      splitIndex = index;
      break;
    }
  }

  return [
    parseNumber(number.slice(1, splitIndex)),
    parseNumber(number.slice(splitIndex + 1, -1)),
  ];
};

const addNumbers = (left, right) => {
  return [left, right];
};

const addToTheFirstValue = (number, regularNumber) => {
  if (!Array.isArray(number)) return number + regularNumber;

  const [left, right] = number;
  if (!Array.isArray(left)) return [left + regularNumber, right];
  return [addToTheFirstValue(left, regularNumber), right];
};

const addToTheLastValue = (number, regularNumber) => {
  if (!Array.isArray(number)) return number + regularNumber;

  const [left, right] = number;
  if (!Array.isArray(right)) return [left, right + regularNumber];
  return [left, addToTheLastValue(right, regularNumber)];
};

const explodeStep = (number, depth = 1, disableExplode) => {
  const [left, right] = number;

  if (!Array.isArray(left) && !Array.isArray(right)) {
    if (depth >= 5 && !disableExplode)
      return {
        value: 0,
        addOnRight: right,
        addOnLeft: left,
        hasExploded: true,
      };

    return { value: number, addOnLeft: 0, addOnRight: 0 };
  } else if (!Array.isArray(left) && Array.isArray(right)) {
    const {
      value: children,
      addOnRight,
      addOnLeft,
      hasExploded,
    } = explodeStep(right, depth + 1, disableExplode);

    return {
      value: [left + addOnLeft, children],
      addOnLeft: 0,
      addOnRight,
      hasExploded,
    };
  } else if (Array.isArray(left) && !Array.isArray(right)) {
    const {
      value: children,
      addOnRight,
      addOnLeft,
      hasExploded,
    } = explodeStep(left, depth + 1, disableExplode);

    return {
      value: [children, right + addOnRight],
      addOnLeft,
      addOnRight: 0,
      hasExploded,
    };
  } else {
    const leftData = explodeStep(left, depth + 1, disableExplode);
    const rightData = explodeStep(
      right,
      depth + 1,
      disableExplode || leftData.hasExploded
    );

    return {
      value: [
        addToTheLastValue(leftData.value, rightData.addOnLeft),
        addToTheFirstValue(rightData.value, leftData.addOnRight),
      ],
      addOnLeft: leftData.addOnLeft,
      addOnRight: rightData.addOnRight,
      hasExploded:
        disableExplode || leftData.hasExploded || rightData.hasExploded,
    };
  }
};

const splitStep = (number, disableSplit) => {
  if (!Array.isArray(number)) {
    if (number > 9 && !disableSplit) {
      return {
        value: [Math.floor(number / 2), Math.ceil(number / 2)],
        hasSplited: true,
      };
    }

    return { value: number };
  }

  const [left, right] = number;
  const leftData = splitStep(left, disableSplit);
  const rightData = splitStep(right, disableSplit || leftData.hasSplited);

  return {
    value: [leftData.value, rightData.value],
    hasSplited: disableSplit || leftData.hasSplited || rightData.hasSplited,
  };
};

const explodeNumber = (number) => explodeStep(number).value;
const splitNumber = (number) => splitStep(number).value;

const computeMagnitude = (number) => {
  if (!Array.isArray(number)) return number;

  const [left, right] = number;

  return 3 * computeMagnitude(left) + 2 * computeMagnitude(right);
};

let result = parseNumber(numbers[0]);

for (const number of numbers.slice(1)) {
  const currentNumber = parseNumber(number);

  result = addNumbers(result, currentNumber);

  let previousResult;
  do {
    do {
      previousResult = result;
      result = explodeNumber(result);
    } while (JSON.stringify(previousResult) !== JSON.stringify(result));

    previousResult = result;
    result = splitNumber(result);
  } while (JSON.stringify(previousResult) !== JSON.stringify(result));
}

console.log(computeMagnitude(result));
