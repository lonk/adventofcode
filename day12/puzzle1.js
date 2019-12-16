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

const axisList = ['x', 'y', 'z'];

for (let step = 0; step < 1000; step++) {
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

    moons.forEach(moon => {
        axisList.forEach(axis => {
            moon.position[axis] += moon.velocity[axis];
        });
    });
}

const energy = moons.map(moon =>
    (Math.abs(moon.position.x) + Math.abs(moon.position.y) + Math.abs(moon.position.z)) * (Math.abs(moon.velocity.x) + Math.abs(moon.velocity.y) + Math.abs(moon.velocity.z))
).reduce((a, b) => a + b, 0);

console.log(energy);
