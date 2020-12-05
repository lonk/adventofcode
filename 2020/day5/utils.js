const isValidRange = (range) =>
  Array.isArray(range) &&
  range.length === 2 &&
  Number.isInteger(range[0]) &&
  Number.isInteger(range[1]) &&
  range[1] >= range[0];

const isValidIndex = (index) =>
  Number.isInteger(index) && index >= 0 && index < 10;

const compute = (boardingPass, index, range) => {
  if (boardingPass.length !== 10) throw new Error("Invalid boarding pass");
  if (!isValidRange(range)) throw new Error("Invalid range");
  if (!isValidIndex(index)) throw new Error("Invalid index");

  const midRange = range[0] + (range[1] - range[0]) / 2;
  let updatedRange;
  switch (boardingPass.charAt(index)) {
    case "F":
    case "L":
      updatedRange = [range[0], Math.floor(midRange)];
      break;
    case "B":
    case "R":
      updatedRange = [Math.ceil(midRange), range[1]];
      break;
    default:
      throw new Error("Invalid boarding pass");
  }

  if (updatedRange[0] === updatedRange[1]) return updatedRange[0];
  else return compute(boardingPass, index + 1, updatedRange);
};

const computeRow = (boardingPass) => compute(boardingPass, 0, [0, 127]);
const computeColumn = (boardingPass) => compute(boardingPass, 7, [0, 7]);

const computeSeatId = (boardingPass) =>
  computeRow(boardingPass) * 8 + computeColumn(boardingPass);

module.exports = { computeSeatId };
