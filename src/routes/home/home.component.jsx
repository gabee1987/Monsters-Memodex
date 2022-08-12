import { useState } from 'react';
import CardList from '../../components/card-list/card-list.component.jsx';

// const defaultCardDeck = {
//   id: 0,
//   isShown: false,
//   isInGame: true,
// };

const Home = () => {
  return (
    <div>
      <button>NEW GAME</button>
      <CardList />
    </div>
  );
};

export default Home;
