const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });
const lines = data.split("\n");
const possibleFoodsByAllergen = new Map();
const ingredientsDatabase = new Map();

for (const line of lines) {
  const splitedLine = line.split(" (contains ");
  const ingredients = splitedLine[0].split(" ");
  const allergens = splitedLine[1].replace(")", "").split(", ");
  for (const ingredient of ingredients) {
    ingredientsDatabase.set(
      ingredient,
      (ingredientsDatabase.get(ingredient) || 0) + 1
    );
  }

  for (const allergen of allergens) {
    const currentPossibleFoods = possibleFoodsByAllergen.get(allergen) || [];

    possibleFoodsByAllergen.set(
      allergen,
      currentPossibleFoods.concat([ingredients])
    );
  }
}

for (const possibleFoods of Array.from(possibleFoodsByAllergen.values())) {
  const canBeAllergenContainer = possibleFoods.reduce(
    (container, food) =>
      container.filter((ingredient) => food.includes(ingredient)),
    possibleFoods[0]
  );

  for (const ingredientToDelete of canBeAllergenContainer) {
    ingredientsDatabase.delete(ingredientToDelete);
  }
}

console.log(
  Array.from(ingredientsDatabase.values()).reduce(
    (acc, quantity) => acc + quantity,
    0
  )
);
