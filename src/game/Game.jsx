export function Game() {

  let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: ['bootstrap',
      'css',
      'electron',
      'firebase',
      'html',
      'javascript',
      'jquery',
      'mongo',
      'node',
      'react'],

    cards: null,

    setCard: function (id) {

      let card = cards.filter(card => card.id === id)[0];
      console.log(card);
      if (card.flipped || lockMode) {
        return false;
      }

      if (!firstCard) {
        firstCard = card;
        firstCard.flipped = true;
        return true;
      } else {
        secondCard = card;
        secondCard.flipped = true;
        lockMode = true;
        return true;
      }

    },

    checkMatch: function () {
      if (!firstCard || !secondCard) {
        return false;
      }
      return firstCard.icon === secondCard.icon;
    },

    clearCards: function () {
      firstCard = null;
      secondCard = null;
      lockMode = false;
    },
    unflipCards() {
      firstCard.flipped = false;
      secondCard.flipped = false;
      clearCards();
    },

    checkGameOver() {

      return cards.filter(card => !card.flipped).length == 0;
    },

    createCardsFromTechs: function () {

      cards = [];

      techs.forEach((tech) => {
        cards.push(createPairFromTech(tech));
      })
      cards = cards.flatMap(pair => pair);
      shuffleCards();
      return cards;
    },

    createPairFromTech: function (tech) {

      return [{
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false,
      }, {
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false,
      }]

    },

    createIdWithTech: function (tech) {
      return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
      let currentIndex = cards.length;
      let randomIndex = 0;

      while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
      }

    },

    flipCard: function (cardId, gameOverCallBack, noMatchCallback) {
      if (setCard(cardId)) {
        if (secondCard) {
          if (checkMatch()) {
            clearCards();
            if (checkGameOver()) {
              //Game Over
              gameOverCallBack()
            }
          } else {
            setTimeout(() => {
              // No Match
              unflipCards();
              noMatchCallback();
            }, 1000);

          };
        }
      }
    }

  }
  return { game }
}
