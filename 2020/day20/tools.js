const flip = (grid) => grid.slice().reverse();
const clockWiseRotate = (grid) =>
  grid[0].map((_, index) => grid.map((row) => row[index]).slice().reverse());

module.exports = { flip, clockWiseRotate };
