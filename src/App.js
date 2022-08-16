import { Routes, Route } from 'react-router-dom'; // Have to run "yarn add react-router-dom" if not found

// Components
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import MainMenu from './routes/main-menu/main-menu.component';

import './App.scss';

const App = () => {
  // this.state = {
  //   monstersDeck: [],
  //   selectedCards: [],
  //   numberOfCardsLeft: 0,
  //   numberOfAllCards: 0,
  // };

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" index element={<MainMenu />} />
        <Route path="game" index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
