const computeSeatId = (boardingPass) => {
  const binary = boardingPass.replace(/F|L/g, "0").replace(/B|R/g, "1");

  return parseInt(binary, 2);
};

module.exports = { computeSeatId };
