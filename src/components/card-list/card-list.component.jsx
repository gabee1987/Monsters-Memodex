import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import { GameStateContext } from '../../contexts/game-state.context.jsx';

import Card from '../card/card.component.jsx';

import { calculateStaggerDelay } from '../../utilities/animation-helper.js';
import { adjustCardSize } from '../../utilities/card-size-helper.js';

import './card-list.styles.scss';

const CardList = ({
  cards,
  handleChoice,
  firstChoice,
  secondChoice,
  disabled,
}) => {
  const [cardSize, setCardSize] = useState(230); // default size

  useEffect(() => {
    const handleResize = () => {
      const newCardSize = adjustCardSize(
        window.innerWidth,
        window.innerHeight,
        cards.length
      );
      setCardSize(newCardSize);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
  const { isNeedStaggerAnimation } = useContext(GameStateContext);
  const { isShufflingActive, setIsShufflingActive } =
    useContext(GameStateContext);

  const staggerDelay = isNeedStaggerAnimation
    ? calculateStaggerDelay(cards.length)
    : 0;

  const childrenDelay = isNeedStaggerAnimation ? 1.5 : 0;

  // Animation for card creation and for the shuffle ->
  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        // delay: 1,
        // when: 'afterChildren',
        // when: 'beforeChildren',
        staggerChildren: staggerDelay, // Dynamic stagger timing
        delayChildren: childrenDelay,
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
      animate={cards.length > 0 ? 'show' : 'hidden'}
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
