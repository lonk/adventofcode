const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });
const [initialPlayer1Deck, initialPlayer2Deck] = data
  .split("\n\n")
  .map((deck) => {
    const [_, ...cards] = deck.split("\n");

    return cards.map((card) => parseInt(card, 10));
  });

const player1Deck = initialPlayer1Deck.slice();
const player2Deck = initialPlayer2Deck.slice();

while (player1Deck.length > 0 && player2Deck.length > 0) {
  const player1Card = player1Deck.shift();
  const player2Card = player2Deck.shift();

  if (player1Card > player2Card) {
    player1Deck.push(player1Card, player2Card);
  } else if (player2Card > player1Card) {
    player2Deck.push(player2Card, player1Card);
  }
}

if (player1Deck.length > 0) {
  console.log(
    player1Deck.reduce(
      (acc, card, index) => acc + card * (player1Deck.length - index),
      0
    )
  );
} else if (player2Deck.length > 0) {
  console.log(
    player2Deck.reduce(
      (acc, card, index) => acc + card * (player2Deck.length - index),
      0
    )
  );
}
