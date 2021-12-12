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

const canCaveBeVisited = (pathHistory, cave) => {
  if (cave === "start") return false;
  if (cave === cave.toUpperCase()) return true;

  const cavesVisitCount = new Map();

  for (const visitedCave of pathHistory) {
    cavesVisitCount.set(
      visitedCave,
      (cavesVisitCount.get(visitedCave) ?? 0) + 1
    );
  }

  return (
    (cavesVisitCount.get(cave) ?? 0) === 0 ||
    ((cavesVisitCount.get(cave) ?? 0) === 1 &&
      Array.from(cavesVisitCount.entries()).filter(
        ([visitedCave, count]) =>
          count > 1 && visitedCave === visitedCave.toLowerCase()
      ).length === 0)
  );
};

const computeBranches = (pathHistory) => {
  const nextPossiblesPath = connections.get(
    pathHistory[pathHistory.length - 1]
  );

  return Array.from(nextPossiblesPath)
    .filter((nextPossiblePath) =>
      canCaveBeVisited(pathHistory, nextPossiblePath)
    )
    .flatMap((nextPossiblePath) =>
      nextPossiblePath === "end"
        ? [pathHistory.concat([nextPossiblePath])]
        : computeBranches(pathHistory.concat([nextPossiblePath]))
    );
};

const paths = computeBranches(["start"]);
console.log(paths.length);
