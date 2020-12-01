const data = '124075-580769';

const range = data.split('-');

const isPasswordValid = password => {
    let hasOnlyTwoSameAdjacent = false;
    let isDecreasing = false;

    for (let cursor = 0; cursor < 5; cursor++) {
        if (password.charAt(cursor) === password.charAt(cursor + 1)) {
            let leftSideIsDifferent = true;
            let rightSideIsDifferent = true;

            if (cursor - 1 >= 0) {
                leftSideIsDifferent = password.charAt(cursor - 1) !== password.charAt(cursor);
            }

            if (cursor + 2 <= 5) {
                rightSideIsDifferent = password.charAt(cursor + 1) !== password.charAt(cursor + 2);
            }

            hasOnlyTwoSameAdjacent = hasOnlyTwoSameAdjacent || leftSideIsDifferent && rightSideIsDifferent;
        }

        if (password.charAt(cursor) > password.charAt(cursor + 1)) {
            isDecreasing = true;
        }
    }

    return hasOnlyTwoSameAdjacent && !isDecreasing;
};

let validPasswordsQuantity = 0;

for (let password = range[0]; password <= range[1]; password++) {
    if (isPasswordValid(password.toString())) {
        validPasswordsQuantity++;
    }
}

console.log(validPasswordsQuantity);
