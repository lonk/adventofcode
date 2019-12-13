const fs = require('fs');

const data = fs.readFileSync('day8.data', { encoding: 'utf-8' });

const layerSize = 25 * 6;
const imageSize = data.length;

const layers = [];

for (let i = 0; i < imageSize; i += layerSize) {
    layers.push(data.substring(i, i + layerSize));
}

const image = [];
let chosenPixel = 2;
let layerDepth = 0;

for (let pixel = 0; pixel < layerSize; pixel++) {
    chosenPixel = 2;
    layerDepth = 0;

    while (chosenPixel === 2) {
        chosenPixel = parseInt(layers[layerDepth].charAt(pixel), 10);
        layerDepth++;
    }

    image.push(chosenPixel);
}

const finalImage = image.join('');

for (let line = 0; line < layerSize; line += 25) {
    console.log(finalImage.substring(line, line + 25).replace(/0/g, ' '));
}
