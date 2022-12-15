const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const lines = data.split("\n");

const parseFileSystem = () => {
    const filesystem = new Map();
    let cursor = ['/'];

    for (const line of lines) {
        if (line.charAt(0) === '$') {
            const [_, command, target] = line.split(' ');

            if (command === 'cd') {
                if (target === '/') {
                    cursor = [];
                } else if (target === '..') {
                    if (cursor.length === 0) continue;

                    cursor = cursor.slice(0, cursor.length - 1);
                } else {
                    cursor.push(target);
                }
            }

            continue;
        }

        const [dirOrSize, name] = line.split(' ');
        const cursorStr = '/' + cursor.join('/');
        const currentDir = filesystem.get(cursorStr) ?? {};
        const completePath = cursorStr === '/' ? cursorStr + name : `${cursorStr}/${name}`;

        filesystem.set(cursorStr, {
            ...currentDir,
            [dirOrSize === 'dir' ? completePath : name]: dirOrSize === 'dir' ? 'dir' : parseInt(dirOrSize, 10)
        });

    }

    return filesystem;
}

const computeDirectorySize = (filesystem, path) => {
    const directory = filesystem.get(path);

    return Object.entries(directory).reduce((acc, [subPath, dirOrSize]) => {
        if (dirOrSize === 'dir') {
            return acc + computeDirectorySize(filesystem, subPath);
        }

        return acc + dirOrSize;
    }, 0);
};

const part1 = () => {
    const filesystem = parseFileSystem();

    return Array.from(filesystem.keys()).reduce((acc, directory) => {
        const directorySize = computeDirectorySize(filesystem, directory);

        if (directorySize <= 100000) return acc + directorySize;

        return acc;
    }, 0);
};

const part2 = () => {
    const filesystem = parseFileSystem();

    const spaceToBeFreedUp = 30000000 - (70000000 - computeDirectorySize(filesystem, '/'));

    return Array.from(filesystem.keys()).reduce((smallestIncreasedSpace, directory) => {
        const directorySize = computeDirectorySize(filesystem, directory);

        if (directorySize < spaceToBeFreedUp) return smallestIncreasedSpace;

        return Math.min(smallestIncreasedSpace, directorySize);
    }, +Infinity);
};

console.log('Part 1: ', part1());
console.log('Part 2: ', part2());
