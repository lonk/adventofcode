const fs = require('fs');

const data = fs.readFileSync('day8.data', { encoding: 'utf-8' });

const layerSize = 25 * 6;
const imageSize = data.length;

const layers = [];

for (let i = 0; i < imageSize; i += layerSize) {
    layers.push(data.substring(i, i + layerSize));
}

const analyzedLayers = layers
    .map(layer => {
        const nb0 = layer.split('0').length - 1;
        const nb1 = layer.split('1').length - 1;
        const nb2 = layer.split('2').length - 1;
        const multiply = nb1 * nb2;

        return { nb0, nb1, nb2, multiply };
    })
    .sort((a, b) => a.nb0 - b.nb0);

console.log(analyzedLayers[0].multiply)
