const fs = require('fs');

const data = fs.readFileSync('day10.data', { encoding: 'utf-8' });

// X,Y -> grid[Y][X]
const grid = data.split("\n").map(line => line.split(''));
const asteroids = [];

grid.forEach((line, y) => {
    line.forEach((value, x) => {
        if (value === '#') {
            asteroids.push({ x, y });
        }
    });
});

const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);

const coordsBetweenAsteroids = (x1, y1, x2, y2) => {
    const coords = [];

    const xBigStep = Math.abs(x2 - x1);
    const yBigStep = Math.abs(y2 - y1);
    const gcdSteps = gcd(xBigStep, yBigStep);
    const xStep = xBigStep / gcdSteps;
    const yStep = yBigStep / gcdSteps;

    if (x1 >= x2 && y1 >= y2) {
        for (let i = 1; i < gcdSteps; i++) {
            coords.push({ x: x1 - i * xStep, y: y1 - i * yStep });
        }
    } else if (x1 >= x2 && y1 <= y2) {
        for (let i = 1; i < gcdSteps; i++) {
            coords.push({ x: x1 - i * xStep, y: y1 + i * yStep });
        }
    } else if (x1 <= x2 && y1 >= y2) {
        for (let i = 1; i < gcdSteps; i++) {
            coords.push({ x: x1 + i * xStep, y: y1 - i * yStep });
        }
    } else if (x1 <= x2 && y1 <= y2) {
        for (let i = 1; i < gcdSteps; i++) {
            coords.push({ x: x1 + i * xStep, y: y1 + i * yStep });
        }
    }

    return coords;
};

const countForAsteroid = ({ x, y }) =>
    asteroids.map(target => {
        if (x === target.x && y === target.y) {
            return false;
        }

        const isThereAnAsteroidBetween = coordsBetweenAsteroids(x, y, target.x, target.y)
            .map(coords => !!asteroids.find(asteroid => asteroid.y === coords.y && asteroid.x === coords.x))
            .reduce((a, b) => a || b, false)

        return !isThereAnAsteroidBetween;
    })
    .reduce((a, b) => b ? a + 1 : a, 0);

const values = asteroids.map(asteroid => countForAsteroid(asteroid));

const bestAsteroid = asteroids[values.indexOf(Math.max(...values))];

const polarAsteroids = asteroids
    .filter(({ x, y }) => x !== bestAsteroid.x || y !== bestAsteroid.y)
    .map(({ x, y }) => {
        const rebasedX = x - bestAsteroid.x;
        const rebasedY = y - bestAsteroid.y;

        const distance = Math.sqrt(Math.pow(rebasedX, 2) + Math.pow(rebasedY, 2))
        const atan = Math.atan2(rebasedY, rebasedX);
        const angle = 180 / Math.PI * (atan < 0 ? 2 * Math.PI + atan : atan);

        return { x, y, distance, angle };
    })
    .sort((a, b) => a.distance - b.distance);

const groupBy = (xs, key) =>
    xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});

const angles = groupBy(polarAsteroids, 'angle');

const orderAngles = Object.keys(angles)
    .sort((a, b) => a - b);

let cursorIndex = orderAngles.indexOf('270');
let position = 0;
let shifted;
let answer;

while (position < polarAsteroids.length) {
    if (angles[orderAngles[cursorIndex]].length > 0) {
        shifted = angles[orderAngles[cursorIndex]].shift();
        position++;

        if (position === 200) {
            answer = shifted;
        }
    }

    cursorIndex++;

    if (!orderAngles[cursorIndex]) {
        cursorIndex = 0;
    }
}

console.log(answer.x * 100 + answer.y);
