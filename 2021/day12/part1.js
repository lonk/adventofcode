const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });

const rules = data.split("\n");

const connections = new Map();

for (const rule of rules) {
  const [start, end] = rule.split("-");

  const alreadyKnownConnections = connections.get(start) ?? new Set();
  alreadyKnownConnections.add(end);
  connections.set(start, alreadyKnownConnections);

  const alreadyKnownConnections2 = connections.get(end) ?? new Set();
  alreadyKnownConnections2.add(start);
  connections.set(end, alreadyKnownConnections2);
}

const computeBranches = (pathHistory) => {
  const nextPossiblesPath = connections.get(
    pathHistory[pathHistory.length - 1]
  );

  return Array.from(nextPossiblesPath)
    .filter(
      (nextPossiblePath) =>
        !(
          pathHistory.includes(nextPossiblePath) &&
          nextPossiblePath === nextPossiblePath.toLowerCase()
        )
    )
    .flatMap((nextPossiblePath) =>
      nextPossiblePath === "end"
        ? [pathHistory.concat([nextPossiblePath])]
        : computeBranches(pathHistory.concat([nextPossiblePath]))
    );
};

const paths = computeBranches(['start']);

console.log(paths.length);
