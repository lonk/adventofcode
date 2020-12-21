const flip = (grid) => grid.reverse();
const clockWiseRotate = (grid) =>
  grid[0].map((_, index) => grid.map((row) => row[index]).reverse());

module.exports = { flip, clockWiseRotate };
