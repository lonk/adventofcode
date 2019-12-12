const data = '124075-580769';

const range = data.split('-');

const isPasswordValid = password => {
    let hasTwoSameAdjacent = false;
    let isDecreasing = false;

    for (let cursor = 0; cursor < 5; cursor++) {
        if (password.charAt(cursor) === password.charAt(cursor + 1)) {
            hasTwoSameAdjacent = true;
        }

        if (password.charAt(cursor) > password.charAt(cursor + 1)) {
            isDecreasing = true;
        }
    }

    return hasTwoSameAdjacent && !isDecreasing;
};

let validPasswordsQuantity = 0;

for (let password = range[0]; password <= range[1]; password++) {
    if (isPasswordValid(password.toString())) {
        validPasswordsQuantity++;
    }
}

console.log(validPasswordsQuantity);
