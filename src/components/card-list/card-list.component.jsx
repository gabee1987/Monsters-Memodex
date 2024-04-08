import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import { GameStateContext } from '../../contexts/game-state.context.jsx';

import Card from '../card/card.component.jsx';

import './card-list.styles.scss';

const CardList = ({
  cards,
  handleChoice,
  firstChoice,
  secondChoice,
  disabled,
}) => {
  const [cardSize, setCardSize] = useState(230); // default size
  const minCardSize = 50;
  const maxCardSize = 250;
  const gapSize = 10;

  const adjustCardSize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const cardListContainer = document.querySelector('.card-list');
    const navigationBar = document.querySelector('.navigation');
    const gameControls = document.querySelector('.button-container');
    if (!cardListContainer || !navigationBar || !gameControls) return;

    // Heights of other components (Navigation and GameControls)
    const navHeight = navigationBar.offsetHeight;
    const controlsHeight = gameControls.offsetHeight;

    const availableHeight = screenHeight - navHeight - controlsHeight;

    let currentCardSize = maxCardSize;
    let columns = Math.floor(screenWidth / (currentCardSize + gapSize));
    let rows = Math.ceil(cards.length / columns);
    let totalHeight = rows * (currentCardSize + gapSize);

    // Failsafe
    const loopLimit = 100;
    let iterations = 0;

    // Calculate the card size
    while (totalHeight > availableHeight && currentCardSize > minCardSize) {
      currentCardSize -= 10; // decrement size
      columns = Math.floor(screenWidth / (currentCardSize + gapSize));
      rows = Math.ceil(cards.length / columns);
      totalHeight = rows * (currentCardSize + gapSize);
    }

    if (iterations < loopLimit) {
      setCardSize(currentCardSize);
    } else {
      console.error('Failed to resize cards within loop limit');
    }
  };

  useEffect(() => {
    adjustCardSize();
    window.addEventListener('resize', adjustCardSize);

    return () => {
      window.removeEventListener('resize', adjustCardSize);
    };
  }, [cards.length]);

  // Adjust grid layout
  useEffect(() => {
    const cardList = document.querySelector('.card-list');
    if (cardList) {
      cardList.style.gridTemplateColumns = `repeat(auto-fill, minmax(${cardSize}px, 1fr))`;
      // cardList.style.gap = `${gapSize}px`;
    }
  }, [cardSize]);

  // Framer-Motion animation logic
  const { isShufflingActive, setIsShufflingActive } =
    useContext(GameStateContext);

  // Animation for card creation and for the shuffle ->
  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        // delay: 1,
        // when: 'afterChildren',
        // when: 'beforeChildren',
        staggerChildren: 0.1, // Adjust the stagger timing
        delayChildren: 1.5,
        // staggerDirection: -1,
      },
    },
  };

  const childVariants = {
    hidden: { scale: 0, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 5,
        mass: 0.2,
        duration: 0.25,
        // delay: 1,
      },
    },
  };

  return (
    // <div className="card-list-container">
    <motion.div
      className="card-list"
      variants={parentVariants}
      initial="hidden"
      animate={cards.length > 0 && 'show'}
    >
      {cards.map((card, i) => {
        return (
          <motion.div key={`card-${i}`} variants={childVariants}>
            <Card
              id={card.id}
              key={card.id}
              card={card}
              onClick={handleChoice}
              flipped={
                card === firstChoice ||
                card === secondChoice ||
                card.isPaired ||
                card.flippedOnGameOver
              }
              isShuffling={isShufflingActive}
              disabled={disabled}
              size={cardSize}
              // variants={childVariants}
            />
          </motion.div>
        );
      })}
    </motion.div>
    // </div>
  );
};
export default CardList;
