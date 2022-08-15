import { useState } from 'react';
import CardList from '../../components/card-list/card-list.component.jsx';

import './home.styles.scss';

// const defaultCardDeck = {
//   id: 0,
//   isShown: false,
//   isInGame: true,
// };

const Home = () => {
  return (
    <div className="card-list-container">
      <button className="btn new-game-btn">NEW GAME</button>
      {/* <button>SETTINGS</button> */}
      <CardList />
    </div>
  );
};

export default Home;
