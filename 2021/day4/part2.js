const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const values = data.split("\n\n");

const numbersToDraw = values[0].split(",");

const computeBoardWinningCombinations = (board) => {
  const lines = board.split("\n").map((line) => line.trim().split(/\s+/));
  const columns = lines[0].map((_, colIndex) =>
    lines.map((row) => row[colIndex])
  );

  return [
    ...lines.map((line) => new Set(line)),
    ...columns.map((column) => new Set(column)),
  ];
};

const isBoardWinning = (winningCombinations, drawnNumbers) => {
  for (const winningCombination of winningCombinations) {
    const mergedSet = new Set([...winningCombination, ...drawnNumbers]);

    if (mergedSet.size === drawnNumbers.size) return true;
  }

  return false;
};

const computeUnmarkedNumbersSum = (winningCombinations, drawnNumbers) => {
  const allBoardNumbers = winningCombinations
    .slice(0, 5)
    .flatMap((winningCombination) => [...winningCombination]);

  return allBoardNumbers.reduce(
    (sum, boardNumber) =>
      drawnNumbers.has(boardNumber) ? sum : sum + parseInt(boardNumber, 10),
    0
  );
};

let boardsWinningCombinations = values
  .slice(1)
  .map(computeBoardWinningCombinations);

const drawnNumbers = new Set();
let lastWinningBoard;
let lastWinningDrawnNumbers;
let lastWinningDrawnNumber;

for (const drawnNumber of numbersToDraw) {
  drawnNumbers.add(drawnNumber);
  if (drawnNumbers.size < 5) continue;

  let winningBoards = [];
  let remainingBoards = [];

  for (const boardWinningCombinations of boardsWinningCombinations) {
    if (isBoardWinning(boardWinningCombinations, drawnNumbers)) {
      winningBoards.push(boardWinningCombinations);
    } else {
      remainingBoards.push(boardWinningCombinations);
    }
  }

  if (winningBoards.length > 0) {
    lastWinningBoard = winningBoards[0];
    lastWinningDrawnNumbers = new Set(drawnNumbers);
    lastWinningDrawnNumber = drawnNumber;
    boardsWinningCombinations = remainingBoards;
  }

  if (boardsWinningCombinations.length === 0) break;
}

console.log(
  computeUnmarkedNumbersSum(lastWinningBoard, lastWinningDrawnNumbers) *
    parseInt(lastWinningDrawnNumber, 10)
);
