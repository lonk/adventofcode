const fs = require('fs');

const data = fs.readFileSync('day12.data', { encoding: 'utf-8' });

const regex = /<x=(-?\d+), y=(-?\d+), z=(-?\d+)>/;

const moons = data.split("\n")
    .map(moon => {
        const matches = moon.match(regex);

        return {
            position: {
                x: parseInt(matches[1], 10),
                y: parseInt(matches[2], 10),
                z: parseInt(matches[3], 10)
            },
            velocity: {
                x: 0,
                y: 0,
                z: 0
            }
        };
    });

const initialMoons = JSON.parse(JSON.stringify(moons));

const pairs = [];

moons.forEach((moon, moonIndex) => {
    moons.forEach((moon2, moon2Index) => {
        if (moonIndex === moon2Index) {
            return;
        }

        const pair1 = `${moonIndex},${moon2Index}`;
        const pair2 = `${moon2Index},${moonIndex}`;

        if (pairs.indexOf(pair1) === -1 && pairs.indexOf(pair2) === -1) {
            pairs.push(pair1);
        }
    });
});

const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
const lcm = (a, b) => a / gcd(a, b) * b;

const axisList = ['x', 'y', 'z'];

const phaseLengths = {};

let step = 0;

while (!phaseLengths['x'] || !phaseLengths['y'] || !phaseLengths['z']) {
    step++;

    pairs.forEach(pair => {
        const pairedMoons = pair.split(',');

        const moon1 = moons[pairedMoons[0]];
        const moon2 = moons[pairedMoons[1]];

        axisList.forEach(axis => {
            if (moon1.position[axis] < moon2.position[axis]) {
                moon1.velocity[axis] += 1;
                moon2.velocity[axis] -= 1;
            } else if (moon1.position[axis] > moon2.position[axis]) {
                moon1.velocity[axis] -= 1;
                moon2.velocity[axis] += 1;
            }
        });
    });

    const phases = { x: 0, y: 0, z: 0 };
    moons.forEach((moon, index) => {
        axisList.forEach(axis => {
            moon.position[axis] += moon.velocity[axis];

            if (moon.position[axis] === initialMoons[index].position[axis] && moon.velocity[axis] === initialMoons[index].velocity[axis]) {
                phases[axis]++;
            }
        });
    });

    axisList.forEach(axis => {
        if (phases[axis] === 4 && !phaseLengths[axis]) {
            phaseLengths[axis] = step;
        }
    });
}

const lcmXY = lcm(phaseLengths.x, phaseLengths.y);
const lcmXYZ = lcm(lcmXY, phaseLengths.z);

console.log(lcmXYZ);
