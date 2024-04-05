
const i     = {};
i.am        = 'a full stack developer';
i.love      = ['video games', 'board games', 'photography', 'reading', 'watching movies', 'hiking', 'drawing'];
i.workWith  = ['.NET', 'react', 'html', 'scss', 'SQL', 'team players', 'my hand'];
i.aspire    = 'to create impactful solutions, foster collaboration, and inspire creativity in teams'
const createNewDeck = (numberOfPairs) => {
  // TODO need to create some logic around the initial cards, for example a difficulty system where harder difficulty means more card and more complex pictures
  let cards = [];

  for (let index = 0; index < numberOfPairs; index++) {
    cards.push({
      id: 'pairOne-' + index,
      pictureId: index,
      isPaired: false,
    });
    cards.push({
      id: 'pairTwo-' + index,
      pictureId: index,
      isPaired: false,
    });
  }
  return cards;
};

const shuffleCards = (cards) => {
  let shuffledCardDeck = [...cards];
  // Fisher-Yates (or Knuth) Shuffle algorithm
  for (let i = shuffledCardDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCardDeck[i], shuffledCardDeck[j]] = [
      shuffledCardDeck[j],
      shuffledCardDeck[i],
    ];
  }
  return shuffledCardDeck;
};

export const CardDeckService = {
  shuffleCards,
  createNewDeck,
  // any other deck related functions
};

