const fs = require('fs');

const data = fs.readFileSync('day6.data', { encoding: 'utf-8' });

const orbits = data.split("\n");

const orbitsTables = orbits.map(orbit => orbit.split(')'));

const orbitsChildren = {};

orbitsTables.forEach(([left, right]) => {
    orbitsChildren[right] = left;
});

const meToCom = [];
const santaToCom = [];

let cursorMe = 'YOU';
while (cursorMe !== 'COM') {
    cursorMe = orbitsChildren[cursorMe];
    meToCom.push(cursorMe);
}

let cursorSanta = 'SAN';
while (cursorSanta !== 'COM') {
    cursorSanta = orbitsChildren[cursorSanta];
    santaToCom.push(cursorSanta);
}

const intersection = meToCom.find(value => santaToCom.includes(value));

const meToIntersection = meToCom.indexOf(intersection);
const santaToIntersection = santaToCom.indexOf(intersection);

const length = meToIntersection + santaToIntersection;

console.log(length);
