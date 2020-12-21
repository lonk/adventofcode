const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });
const lines = data.split("\n");
const possibleFoodsByAllergen = new Map();

for (const line of lines) {
  const splitedLine = line.split(" (contains ");
  const ingredients = splitedLine[0].split(" ");
  const allergens = splitedLine[1].replace(")", "").split(", ");

  for (const allergen of allergens) {
    const currentPossibleFoods = possibleFoodsByAllergen.get(allergen) || [];

    possibleFoodsByAllergen.set(
      allergen,
      currentPossibleFoods.concat([ingredients])
    );
  }
}

const possibleIngredientsByAllergen = new Map();

for (const [allergen, possibleFoods] of Array.from(
  possibleFoodsByAllergen.entries()
)) {
  const canBeAllergenContainer = possibleFoods.reduce(
    (container, food) =>
      container.filter((ingredient) => food.includes(ingredient)),
    possibleFoods[0]
  );

  possibleIngredientsByAllergen.set(allergen, canBeAllergenContainer);
}

const allergenByIngredient = new Map();

while (allergenByIngredient.size < possibleIngredientsByAllergen.size) {
  for (const [allergen, possibleIngredients] of Array.from(
    possibleIngredientsByAllergen.entries()
  )) {
    const filteredList = possibleIngredients.filter(
      (ingredient) => !allergenByIngredient.has(ingredient)
    );

    if (filteredList.length === 1) {
      allergenByIngredient.set(filteredList[0], allergen);
    }
  }
}

const ingredientByAllergen = new Map(
  Array.from(allergenByIngredient.entries()).map(([integredient, allergen]) => [
    allergen,
    integredient,
  ])
);

const sortedAllergens = Array.from(ingredientByAllergen.keys()).sort();

console.log(
  sortedAllergens
    .map((allergen) => ingredientByAllergen.get(allergen))
    .join(",")
);
