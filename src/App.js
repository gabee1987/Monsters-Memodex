import { Routes, Route } from 'react-router-dom'; // Have to run "yarn add react-router-dom" if not found

// Components
import Navigation from './routes/navigation/navigation.component';
import Game from './routes/game/game.component';
import MainMenu from './routes/main-menu/main-menu.component';

import './App.scss';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<MainMenu />} />
        <Route path="game" element={<Game />} />
      </Route>
    </Routes>
  );
};

export default App;
