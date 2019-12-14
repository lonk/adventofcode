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

console.log(Math.max(...values));
