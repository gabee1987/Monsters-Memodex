import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { GameStateContext } from '../../contexts/game-state.context.jsx';
import { GameSettingsContext } from '../../contexts/game-settings.context.jsx';

import CardList from '../../components/card-list/card-list.component.jsx';
import GameControls from '../../components/game-control/game-control.component.jsx';

import './game.styles.scss';
import WinModal from '../../components/win-modal/win-modal.component.jsx';

const Game = (props) => {
  const [cardDeck, setCardDeck] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [isShufflingActive, setIsShufflingActive] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const { turns, setTurns } = useContext(GameStateContext);
  const { gameInProgress, setGameInProgress } = useContext(GameStateContext);
  const { isWon, setIsWon } = useContext(GameStateContext);
  const { inProgressDeck, setInProgressDeck } = useContext(GameStateContext);
  const { numberOfCards, setNumberOfCards } = useContext(GameSettingsContext);
  const { needNewGame, setNeedNewGame } = useContext(GameStateContext);

  // Need new game?
  // const location = useLocation();
  // const { fromNewGame } = location.state;

  // Create initial card deck
  useEffect(() => {
    console.log('need new game from context?', needNewGame);
    if (needNewGame) {
      console.log('numberOfCards in game start:', numberOfCards);
      setNumberOfCards(numberOfCards);
      const newCardDeck = createInitialCardDeck();
      setCardDeck(newCardDeck);
      setTurns(0);
    } else {
      // setInProgressDeck(inProgressDeck);
      setCardDeck(inProgressDeck);
      console.log('continue progressDeck...', inProgressDeck);
      console.log('continue cardDeck...', cardDeck);
    }
  }, []);

  // Check win condition
  useEffect(() => {
    const winState = checkWinCondition(cardDeck);
    setIsWon(winState);
  }, [cardDeck]);

  // Show the win modal with stats
  useEffect(() => {
    // Show the win modal
    setTimeout(() => setShowWinModal(isWon), 1500);
  }, [isWon]);

  // Compare selected cards
  useEffect(() => {
    // Is any selected cards?
    if (firstChoice && secondChoice) {
      // Set all the cards to disabled to not be able to click them while the compairing and flip animation is running
      setDisabled(true);
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
    // Save the current progress to the context
    setInProgressDeck(cardDeck);
  }, [firstChoice, secondChoice]);

  // Handle the card choice upon click
  const handleChoice = (card) => {
    if (card === firstChoice) {
      return;
    }
    // Set game in progress state
    setGameInProgress(true);

    if (firstChoice != null) {
      setSecondChoice(card);
    } else {
      setFirstChoice(card);
    }
  };

  // TODO in a turn based mode we have to track the number of turns and if a certain amount is reached, game over
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);

    // Count the turns
    setTurns((prevTurns) => prevTurns + 1);

    // Cancel the disabled state of the cards
    setTimeout(() => setDisabled(false), 200);
  };

  // Check win condition
  const checkWinCondition = (cards) => {
    //console.log('cards:', cards);
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

    // Shuffling the cards at start
    // setCardDeck(shuffledCardDeck);

    return cards;
  };

  const shufflingCards = (cards) => {
    let shuffledCardDeck = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), isPaired: false }));

    setTurns(0);
    return shuffledCardDeck;
  };

  const initiateNewGame = () => {
    const newCardDeck = createInitialCardDeck();
    if (cardDeck.length < 1) {
      console.log('cardDeck size: ', cardDeck.length);
      console.log('created cardDeck: ', newCardDeck);
      //setCardDeck(newCardDeck);
      console.log('new game cardDeck before shuffle: ', cardDeck);
    }
    // Set the shuffle animation state
    setIsShufflingActive(true);
    const shuffledCardDeck = shufflingCards(newCardDeck);
    console.log('new game cardDeck: ', cardDeck);
    console.log('number of card before new game: ', numberOfCards);
    // setTimeout(() => cardDeck.forEach((card) => (card.isPaired = false)), 1450);
    setTimeout(() => setCardDeck(shuffledCardDeck), 855);

    // Remove the animation state
    setTimeout(() => setIsShufflingActive(false), 860);

    setTurns(-1);
    resetTurn();
  };

  // Shuffle cards on New Game click
  const handleNewGameClick = () => {
    //console.log('new game runs...');
    setNeedNewGame(true);
    initiateNewGame();
  };

  // Handle the close of the win modal
  const handleWinModalClose = () => {
    setShowWinModal(false);
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
        disabled={disabled}
      />
      {showWinModal && (
        <WinModal
          show={showWinModal}
          turns={turns}
          onClose={handleWinModalClose}
        />
      )}
    </div>
  );
};

export default Game;
