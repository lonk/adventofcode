const fs = require('fs');

const fuelFromMass = mass => Math.floor(mass / 3) - 2;

const data = fs.readFileSync('puzzle1.data', { encoding: 'utf-8' });

const masses = data.split("\n");

const fuel = masses.map(mass => fuelFromMass(mass));

const totalFuel = fuel.reduce((a, b) => a + b, 0);

console.log(totalFuel);
