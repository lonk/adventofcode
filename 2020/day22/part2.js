const { readFileSync } = require("fs");

const data = readFileSync("puzzle.data", { encoding: "utf-8" });
const [initialPlayer1Deck, initialPlayer2Deck] = data
  .split("\n\n")
  .map((deck) => {
    const [_, ...cards] = deck.split("\n");

    return cards.map((card) => parseInt(card, 10));
  });

const play = (deck1, deck2) => {
  const memoryPlayer1 = new Set();
  const memoryPlayer2 = new Set();
  const player1Deck = deck1.slice();
  const player2Deck = deck2.slice();

  while (player1Deck.length > 0 && player2Deck.length > 0) {
    if (
      memoryPlayer1.has(player1Deck.toString()) ||
      memoryPlayer2.has(player2Deck.toString())
    ) {
      return [player1Deck, []];
    }

    memoryPlayer1.add(player1Deck.toString());
    memoryPlayer2.add(player2Deck.toString());

    const player1Card = player1Deck.shift();
    const player2Card = player2Deck.shift();

    if (
      player1Card <= player1Deck.length &&
      player2Card <= player2Deck.length
    ) {
      const [subGamePlayer1Deck, subGamePlayer2Deck] = play(
        player1Deck.slice(0, player1Card),
        player2Deck.slice(0, player2Card)
      );

      if (subGamePlayer1Deck.length > 0) {
        player1Deck.push(player1Card, player2Card);
      } else if (subGamePlayer2Deck.length > 0) {
        player2Deck.push(player2Card, player1Card);
      }
    } else if (player1Card > player2Card) {
      player1Deck.push(player1Card, player2Card);
    } else if (player2Card > player1Card) {
      player2Deck.push(player2Card, player1Card);
    }
  }

  return [player1Deck, player2Deck];
};

const [player1Deck, player2Deck] = play(initialPlayer1Deck, initialPlayer2Deck);

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
