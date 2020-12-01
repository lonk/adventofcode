const fs = require('fs');

const data = fs.readFileSync('day6.data', { encoding: 'utf-8' });

const orbits = data.split("\n");

const orbitsTables = orbits.map(orbit => orbit.split(')'));

const orbitsChildren = {};

orbitsTables.forEach(([left, right]) => {
    orbitsChildren[right] = left;
});

let nbOrbits = 0;

Object.keys(orbitsChildren).forEach(start => {
    let cursor = start;

    while (cursor !== 'COM') {
        cursor = orbitsChildren[cursor];
        nbOrbits++;
    }
});

console.log(nbOrbits);
