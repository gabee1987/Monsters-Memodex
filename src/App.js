import { useEffect, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Have to run "yarn add react-router-dom" if not found
import { AnimatePresence } from 'framer-motion';

// Components
import Navigation from './routes/navigation/navigation.component';
import Game from './routes/game/game.component';
import MainMenu from './routes/main-menu/main-menu.component';
import GameSettings from './routes/game-settings/game-settings.component';

import './App.scss';

const App = () => {
  const location = useLocation();
  const isNotHome = location.pathname !== '/';

  return (
    <>
      <AnimatePresence>{isNotHome && <Navigation />}</AnimatePresence>
      <Routes>
        <Route path="/" index element={<MainMenu />} />
        <Route path="game" element={<Game />} />
        <Route path="settings" element={<GameSettings />} />
      </Routes>
    </>
  );
};

export default App;
