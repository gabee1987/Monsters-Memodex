import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import Card from '../card/card.component.jsx';

import './card-list.styles.scss';

const CardList = ({
  cards,
  handleChoice,
  firstChoice,
  secondChoice,
  isShufflingActive,
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

  // Animation for card creation and for the shuffle ->
  const parentVariants = {
    show: {
      opacity: 1,
      transition: {
        // delay: 0.5,
        // when: 'afterChildren',
        // when: 'beforeChildren',
        // delayChildren: 0.5,
        staggerChildren: 0.15, // Adjust the stagger timing
        // staggerDirection: -1,
      },
    },
    hidden: { opacity: 0 },
  };

  const childVariants = {
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        // delay: 1,
        type: 'spring',
        stiffness: 100,
        damping: 5,
        mass: 0.2,
        duration: 0.25,
      },
    },
    hidden: {
      scale: 0,
      opacity: 0,
    },
  };

  return (
    // <div className="card-list-container">
    <motion.div
      className="card-list"
      variants={parentVariants}
      initial="hidden"
      animate="show"
    >
      {cards.map((card, i) => {
        return (
          <Card
            id={i}
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
            variants={childVariants}
          />
        );
      })}
    </motion.div>
    // </div>
  );
};
export default CardList;
