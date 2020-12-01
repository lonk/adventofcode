const fs = require('fs');

const data = fs.readFileSync('day14.data', { encoding: 'utf-8' });

const reactions = data.split("\n")
    .map(reaction => {
        const parts = reaction.split(' => ')
        const result = parts[1].split(' ');

        const operations = parts[0].split(', ')
            .map(chemicals => {
                const chem = chemicals.split(' ');

                return {
                    quantity: parseInt(chem[0], 10),
                    chemical: chem[1]
                };
            });

        return {
            operations,
            result: {
                quantity: parseInt(result[0], 10),
                chemical: result[1]
            }
        };
    });

const chemicalToOperation = {};

reactions.forEach(reaction => {
    chemicalToOperation[reaction.result.chemical] = reaction;
});

const reductOperation = (chemicalsToProcess, ore, remaining) => {
    if (Object.keys(chemicalsToProcess).length === 0) {
        return ore;
    }

    const step = {};
    const remainingChemicals = { ...remaining };

    Object.entries(chemicalsToProcess).forEach(([ chemicalWanted, quantityWanted ]) => {
        if (chemicalWanted === 'ORE') {
            ore += quantityWanted;
            return;
        }

        const chemical = chemicalToOperation[chemicalWanted];
        const quantityProductedByTheReaction = chemical.result.quantity;

        if (!remainingChemicals[chemicalWanted]) {
            remainingChemicals[chemicalWanted] = 0;
        }

        const quantityAlreadyProduced = remainingChemicals[chemicalWanted];
        const quantityToProduce = quantityWanted - quantityAlreadyProduced;

        const factor = Math.ceil(Math.max(quantityToProduce, 0) / quantityProductedByTheReaction);

        const quantityProduced = factor * quantityProductedByTheReaction;

        remainingChemicals[chemicalWanted] = quantityProduced + quantityAlreadyProduced - quantityWanted;

        chemical.operations.forEach(operation => {
            if (!step[operation.chemical]) {
                step[operation.chemical] = 0;
            }

            step[operation.chemical] += factor * operation.quantity;
        });
    });

    return reductOperation(step, ore, remainingChemicals, Object.keys(chemicalsToProcess).length === 0);
};

const oreFuel1 = reductOperation({ 'FUEL': 1 }, 0, {});

let bottom = Math.floor(1000000000000 / oreFuel1);
let up = 2 * bottom;
let fuel;
let ore = 0;

while (bottom + 1 !== up) {
    fuel = Math.round((bottom + up) / 2);
    ore = reductOperation({ 'FUEL': fuel }, 0, {});

    if (ore <= 1000000000000) {
        bottom = fuel;
    } else {
        up = fuel;
    }
}

console.log(fuel);
