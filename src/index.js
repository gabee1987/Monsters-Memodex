import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './contexts/app-theme.context';
import { GameStateProvider } from './contexts/game-state.context';
import { GameSettingsProvider } from './contexts/game-settings.context';
import { TimeProvider } from './contexts/time-context';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <GameSettingsProvider>
          <GameStateProvider>
            <TimeProvider>
              <App />
            </TimeProvider>
          </GameStateProvider>
        </GameSettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
