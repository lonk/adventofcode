const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const passports = data.split("\n\n");
const regexp = /(hgt:((1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)|pid:(\b\d{9}\b)|hcl:#(\b\w{6}\b)|ecl:(amb|blu|brn|gry|grn|hzl|oth)|byr:(19[2-9]\d|200[0-2])|eyr:(20(2\d|30))|iyr:(20(1\d|20)))/g;

const validPassportsCount = passports.reduce(
  (acc, passport) =>
    (passport.match(regexp) || []).length === 7 ? acc + 1 : acc,
  0
);

console.log(validPassportsCount);
