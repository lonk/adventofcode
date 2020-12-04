const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const passports = data.split("\n\n");
const regexp = /(hgt:|pid:|hcl:|ecl:|byr:|eyr:|iyr:|cir:)/g;

const validPassportsCount = passports.reduce(
  (acc, passport) => (passport.match(regexp).length >= 7 ? acc + 1 : acc),
  0
);

console.log(validPassportsCount);
