import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { GameStateContext } from '../../contexts/game-state.context.jsx';
import { GameSettingsContext } from '../../contexts/game-settings.context.jsx';
import { MODE_SETTING_TYPES } from '../../contexts/game-settings.context.jsx';

import CardList from '../../components/card-list/card-list.component.jsx';
import GameControls from '../../components/game-control/game-control.component.jsx';

import './game.styles.scss';
import WinModal from '../../components/win-modal/win-modal.component.jsx';
import GameOverModal from '../../components/game-over-modal/game-over-modal.component.jsx';

const Game = (props) => {
  const [cardDeck, setCardDeck] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [isShufflingActive, setIsShufflingActive] = useState(false);
  const [cardDisabled, setCardDisabled] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showGameOverModal, setGameOverModal] = useState(false);

  const { turns, setTurns } = useContext(GameStateContext);
  const { gamePaused, setGamePaused } = useContext(GameStateContext);
  const { gameOver, setGameOver } = useContext(GameStateContext);
  const { gameInProgress, setGameInProgress } = useContext(GameStateContext);
  const { isWon, setIsWon } = useContext(GameStateContext);
  const { inProgressDeck, setInProgressDeck } = useContext(GameStateContext);
  const { needNewGame, setNeedNewGame } = useContext(GameStateContext);

  const { numberOfCards, setNumberOfCards } = useContext(GameSettingsContext);
  const { gameMode } = useContext(GameSettingsContext);
  const { difficulty } = useContext(GameSettingsContext);

  // Timer related code
  const {
    firstFlipAtStart,
    setFirstFlipAtStart,
    setNeedToRestartTimer,
    winTime,
  } = useContext(GameStateContext);

  // Handle game over logic
  // useEffect(() => {
  //   if (isTimeUp) {
  //     setGameOver(true);
  //   }
  // }, [isTimeUp]);

  // Create initial card deck
  useEffect(() => {
    if (needNewGame) {
      setNumberOfCards(numberOfCards);
      initiateNewGame();
    } else if (inProgressDeck != null) {
      let savedCards = getCurrentDeckFromLocalStorage();
      setCardDeck(savedCards);
    }
  }, []);

  const initiateNewGame = () => {
    const newCardDeck = createInitialCardDeck();
    if (cardDeck.length < 1) {
    }
    // Set the shuffle animation state
    setIsShufflingActive(true);
    const shuffledCardDeck = shufflingCards(newCardDeck);
    setTimeout(() => setCardDeck(shuffledCardDeck), 855);

    // Remove the animation state
    setTimeout(() => setIsShufflingActive(false), 860);

    setTurns(-1);
    resetTurn();
    setGameInProgress(false);
    setTimeout(() => setGameOver(false), 500);
    setNeedNewGame(false);
    setFirstFlipAtStart(false);
    setIsWon(false);
  };

  // Create the initial card deck on game start
  const createInitialCardDeck = () => {
    // TODO need to create some logic around the initial cards, for example a difficulty system where harder difficulty means more card
    let cards = [];

    for (let index = 0; index < numberOfCards; index++) {
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

  const shufflingCards = (cards) => {
    let shuffledCardDeck = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), isPaired: false }));

    setTurns(0);
    return shuffledCardDeck;
  };

  // Start a New Game on click
  const handleNewGameClick = () => {
    initiateNewGame();
    setNeedToRestartTimer(true);
  };

  useEffect(() => {
    if (needNewGame) {
      initiateNewGame();
    }
  }, [needNewGame]);

  // Handle the card choice upon click
  const handleChoice = (card) => {
    if (card === firstChoice) {
      return;
    }

    // Set firstFlip to true when first card is flipped at the start of the game
    if (!firstFlipAtStart) {
      setFirstFlipAtStart(true);
    }

    if (!gameInProgress) {
      // handleGameStart();
    } else {
      // Continue the game if it was paused
      if (gamePaused) {
        setGamePaused(false);
      }
    }

    if (firstChoice != null) {
      setSecondChoice(card);
    } else {
      setFirstChoice(card);
    }
  };

  // Compare selected cards
  useEffect(() => {
    // Is any selected cards?
    if (firstChoice && secondChoice) {
      // Set all the cards to disabled to not be able to click them while the compairing and flip animation is running
      setCardDisabled(true);

      // Is the selected cards match?
      if (firstChoice.pictureId === secondChoice.pictureId) {
        //If so, set those cards property to paired
        setCardDeck((prevCards) => {
          // We generate a new carddeck with those 2 cards that matched with paired property
          return prevCards.map((card) => {
            if (card.pictureId === firstChoice.pictureId) {
              return { ...card, isPaired: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  // Save the current progress to the context
  useEffect(() => {
    setTimeout(() => setInProgressDeck(cardDeck), 500);
    setTimeout(() => saveCurrentDeckToLocalStorage(cardDeck), 500);
  }, [cardDeck]);

  // Check win condition
  useEffect(() => {
    const winState = checkWinCondition(cardDeck);
    setIsWon(winState);
  }, [cardDeck]);

  // Check win condition
  const checkWinCondition = (cards) => {
    if (cards.length < 1) {
      return false;
    }
    const result = cards.every((card) => {
      if (card.isPaired) {
        return true;
      } else {
        return false;
      }
    });

    return result;
  };

  // Handling the win state, show the won modal and save the timer is its a timer based mode
  useEffect(() => {
    if (isWon) {
      // Save win time and Stop the game
      // if (gameMode === MODE_SETTING_TYPES.TIME_BASED) {
      //   console.log('Is pause happening in game component?');
      // }
      setTimeout(() => setShowWinModal(isWon), 1500);
      setGameInProgress(false);
    }
  }, [isWon, setGameInProgress]);

  const flipAndDisableAllCards = (cardsToFlip) => {
    return cardsToFlip.map((card) => {
      return { ...card, flippedOnGameOver: true, disabled: true };
    });
  };

  const handleGameOver = () => {
    // console.log('gameover why showing up: ', gameOver);
    setIsWon(false);
    const flippedAndDisabledCards = flipAndDisableAllCards(cardDeck);
    setTimeout(() => setCardDeck(flippedAndDisabledCards), 2000);
  };

  // Show the Game Over modal with stats
  useEffect(() => {
    if (gameOver) {
      handleGameOver();
      setTimeout(() => setGameOverModal(gameOver), 1500);
    }
  }, [gameOver]);

  // Handle the close of the win modal
  const handleWinModalClose = () => {
    setShowWinModal(false);
  };

  // Handle the close of the Game Over modal
  const handleGameOverModalClose = () => {
    setGameOverModal(false);
  };

  // TODO in a turn based mode we have to track the number of turns and if a certain amount is reached, game over
  const resetTurn = () => {
    if (isWon || gameOver) {
      //setTimerStarted(false); // Reset timer start trigger on game over or win
    }

    setFirstChoice(null);
    setSecondChoice(null);

    // Count the turns
    setTurns((prevTurns) => prevTurns + 1);

    // Cancel the disabled state of the cards
    setTimeout(() => setCardDisabled(false), 200);
  };

  const saveCurrentDeckToLocalStorage = (cards) => {
    localStorage.setItem('inProgressDeck', JSON.stringify(cards));
    // console.log('deck is saved to local storage:', cards);
  };

  const getCurrentDeckFromLocalStorage = () => {
    const cards = JSON.parse(localStorage.getItem('inProgressDeck'));
    if (cards) {
      return cards;
    }
  };

  return (
    <div className="game-container">
      <GameControls newGameClick={handleNewGameClick} />
      <CardList
        cards={cardDeck}
        handleChoice={handleChoice}
        firstChoice={firstChoice}
        secondChoice={secondChoice}
        isShufflingActive={isShufflingActive}
        disabled={cardDisabled}
      />
      {showWinModal && (
        <WinModal
          show={showWinModal}
          turns={turns}
          time={winTime}
          onClose={handleWinModalClose}
          gameMode={gameMode}
        />
      )}
      {showGameOverModal && (
        <GameOverModal
          show={showGameOverModal}
          onClose={handleGameOverModalClose}
        />
      )}
    </div>
  );
};

export default Game;
