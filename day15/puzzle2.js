const fs = require('fs');

const data = fs.readFileSync('day15.data', { encoding: 'utf-8' });

const program = data.split(',').map(value => parseInt(value, 10));

// Works only with 1 possible path. If multiples paths, do a BFS (risks -> go round)

const displayGrid = grid => {
    const coordinates = Object.keys(grid).map(strCoordinates => strCoordinates.split(','));
    const coordinatesX = coordinates.map(arrCoordinates => arrCoordinates[0]);
    const coordinatesY = coordinates.map(arrCoordinates => arrCoordinates[1]);

    const minX = Math.min(...coordinatesX);
    const minY = Math.min(...coordinatesY);
    const maxX = Math.max(...coordinatesX);
    const maxY = Math.max(...coordinatesY);

    let tile;

    for (let cursorY = minY; cursorY <= maxY; cursorY++) {
        for (let cursorX = minX; cursorX <= maxX; cursorX++) {
            tile = grid[`${cursorX},${cursorY}`];
            if (tile && tile === -1) {
                process.stdout.write('#');
            } else if (tile && tile === 'O') {
                process.stdout.write(tile);
            } else {
                process.stdout.write(' ');
            }
        }

        process.stdout.write("\n");
    }
};

const nextCoordsByDirection = (coords, direction) => {
    const arrayCoords = coords.split(',');

    if (direction === 1) arrayCoords[1]++;
    else if (direction === 2) arrayCoords[1]--;
    else if (direction === 3) arrayCoords[0]--;
    else if (direction === 4) arrayCoords[0]++;
    
    return arrayCoords.join(',');
};

const expandOxygen = (coordsList, grid, minutes) => {
    const nextCoords = [];

    coordsList.forEach(coords => {
        for (let i = 1; i <= 4; i++) {
            if (grid[nextCoordsByDirection(coords, i)] !== -1 && grid[nextCoordsByDirection(coords, i)] !== 'O') {
                grid[nextCoordsByDirection(coords, i)] = 'O';
                nextCoords.push(nextCoordsByDirection(coords, i));
            }
        }
    });

    if (nextCoords.length === 0) {
        return minutes;
    }

    minutes++;

    return expandOxygen(nextCoords, grid, minutes);
};

const isMapComplete = grid =>
    !!grid['0,0'] && Object.entries(grid)
        .map(([coords, value]) => {
            if (value === -1) {
                return true;
            }

            return !!grid[nextCoordsByDirection(coords, 1)] && !!grid[nextCoordsByDirection(coords, 2)] && !!grid[nextCoordsByDirection(coords, 3)] && !!grid[nextCoordsByDirection(coords, 4)];
        })
        .reduce((a, b) => a && b, true);

const chooseNextInput = (botCoords, grid) => {
    let lastWeight = Infinity;
    let direction;

    for (let i = 1; i <= 4; i++) {
        if (!grid[nextCoordsByDirection(botCoords, i)]) {
            grid[nextCoordsByDirection(botCoords, i)] = 0;
        }

        if (grid[nextCoordsByDirection(botCoords, i)] > -1) {
            if (lastWeight > grid[nextCoordsByDirection(botCoords, i)]) {
                lastWeight = grid[nextCoordsByDirection(botCoords, i)];
                direction = i;
            }
        }
    }

    return direction;
};

const processOutput = (lastInput, botCoords, output, grid) => {
    const nextCoords = nextCoordsByDirection(botCoords, lastInput);

    let found = false;

    switch (output) {
        case 0:
            grid[nextCoords] = -1;
            break;
        case 1:
            botCoords = nextCoords;
            grid[botCoords] = grid[botCoords] ? grid[botCoords] + 1 : 1;
            break;
        case 2:
            botCoords = nextCoords;
            grid[botCoords] = grid[botCoords] ? grid[botCoords] + 1 : 1;
            found = true;
            break;
    }

    return { grid, nextCoords, botCoords, found };
};

const generateOutputByMode = (type, input, mode, relativeBase, program) => {
    if (type === 'write') {
        return mode === 2 ? relativeBase + input : input;
    }

    return mode === 0
        ? program[input]
        : mode === 1
            ? input
            : program[input + relativeBase];
};

let cursor = 0;
let relativeBase = 0;
let lastInput, nextCoords, found, foundCoords;
let botCoords = '0,0';
let grid = {};

while (!isMapComplete(grid) && program[cursor] && cursor !== -1) {
    const mode = program[cursor].toString().padStart(5, '0');
    const opcode = parseInt(mode.substring(3), 10);

    const paramMode1 = parseInt(mode.charAt(2), 10);
    const paramMode2 = parseInt(mode.charAt(1), 10);
    const paramMode3 = parseInt(mode.charAt(0), 10);

    const param1 = program[cursor + 1];
    const param2 = program[cursor + 2];
    const param3 = program[cursor + 3];

    let input, addressToWrite, paramValue1, paramValue2, paramValue3;

    switch (opcode) {
        case 1:
            addressToWrite = generateOutputByMode('write', param3, paramMode3, relativeBase, program);
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);

            program[addressToWrite] = paramValue1 + paramValue2;

            cursor += 4;
            break;
        case 2:
            addressToWrite = generateOutputByMode('write', param3, paramMode3, relativeBase, program);
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);

            program[addressToWrite] = paramValue1 * paramValue2;

            cursor += 4;
            break;
        case 3:
            addressToWrite = generateOutputByMode('write', param1, paramMode1, relativeBase, program);
            input = chooseNextInput(botCoords, grid);
            lastInput = input;
            program[addressToWrite] = input;

            cursor += 2;
            break;
        case 4:
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);

            ({ grid, nextCoords, found, botCoords } = processOutput(lastInput, botCoords, parseInt(paramValue1, 10), grid));

            if (found) {
                foundCoords = nextCoords;
            }
            //console.log('Output:', paramValue1);

            cursor += 2;
            break;
        case 5:
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);
            if (paramValue1 !== 0) {
                cursor = paramValue2;
            } else {
                cursor += 3;
            }
            break;
        case 6:
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);
            if (paramValue1 === 0) {
                cursor = paramValue2;
            } else {
                cursor += 3;
            }
            break;
        case 7:
            addressToWrite = generateOutputByMode('write', param3, paramMode3, relativeBase, program);
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);

            program[addressToWrite] = paramValue1 < paramValue2 ? 1 : 0;

            cursor += 4;
            break;
        case 8:
            addressToWrite = generateOutputByMode('write', param3, paramMode3, relativeBase, program);
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);
            paramValue2 = generateOutputByMode('read', param2, paramMode2, relativeBase, program);

            program[addressToWrite] = paramValue1 === paramValue2 ? 1 : 0;

            cursor += 4;
            break;
        case 9:
            paramValue1 = generateOutputByMode('read', param1, paramMode1, relativeBase, program);

            relativeBase += paramValue1;

            cursor += 2;
            break;
        case 99:
            console.log('Opcode 99');
            cursor = -1;
            break;
        default:
            console.log('Unknown opcode', opcode);
            cursor = -1;
            break;
    }
}

grid[foundCoords] = 'O';
console.log(expandOxygen([foundCoords], grid, 0));
