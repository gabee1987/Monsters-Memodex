import { useState } from 'react';
import CardList from '../../components/card-list/card-list.component.jsx';

// const defaultCardDeck = {
//   id: 0,
//   isShown: false,
//   isInGame: true,
// };

const Home = () => {
  const monstersDeck = createInitialCardDeck();

  return (
    <div>
      <CardList monsters={monstersDeck} />
    </div>
  );
};

const createInitialCardDeck = () => {
  // TODO need to create some logic around the initial cards, for example a difficulty system where harder difficulty means more card
  const numOfCards = 10;
  let monsters = [];

  for (let index = 0; index < numOfCards; index++) {
    monsters.push({
      id: index,
      isShown: false,
      isInGame: true,
    });
    monsters.push({
      id: index,
      isShown: false,
      isInGame: true,
    });
  }
  console.log('home component');
  console.log(monsters);
  return monsters;
};

export default Home;
