const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const formatBagContent = (bagWithQuantity) => {
  [quantity, ...bag] = bagWithQuantity.split(" ");

  return {
    quantity: parseInt(quantity, 10),
    bag: bag.join(" "),
  };
};

const formatBagFromLine = (line) => {
  const splittedLine = line.split(" bags contain ");
  const bag = splittedLine[0];

  if (splittedLine[1] === "no other bags.") return [bag, []];

  const content = splittedLine[1].split(/ bags, | bag, | bag\.| bags\./g);
  content.pop();

  return [bag, content.map(formatBagContent)];
};

const bagsContent = new Map(lines.map(formatBagFromLine));

const countSubBags = (bag) => {
  const bagContent = bagsContent.get(bag);

  if (!bagContent) throw "A bag doesn't exist";

  if (bagContent.length === 0) return 0;

  return bagContent.reduce(
    (acc, subBag) => acc + subBag.quantity * (1 + countSubBags(subBag.bag)),
    0
  );
};

console.log(countSubBags("shiny gold"));
