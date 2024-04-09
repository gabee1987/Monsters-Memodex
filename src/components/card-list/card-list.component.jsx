import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import { GameStateContext } from '../../contexts/game-state.context.jsx';

import Card from '../card/card.component.jsx';

import {
  calculateCardListStaggerDelay,
  calculateCardListChildrenDelay,
  getCardListParentVariants,
  cardListChildVariants,
} from '../../utilities/animation-helper.js';
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

  // Framer-Motion animation
  const { isNeedStaggerAnimation } = useContext(GameStateContext);
  const { isShufflingActive } = useContext(GameStateContext);

  const staggerDelay = calculateCardListStaggerDelay(
    cards.length,
    isNeedStaggerAnimation
  );
  const childrenDelay = calculateCardListChildrenDelay(isNeedStaggerAnimation);
  const cardListParentVariants = getCardListParentVariants(
    staggerDelay,
    childrenDelay
  );

  return (
    <motion.div
      className="card-list"
      variants={cardListParentVariants}
      initial="hidden"
      animate={cards.length > 0 ? 'show' : 'hidden'}
    >
      {cards.map((card, i) => {
        return (
          <motion.div key={`card-${i}`} variants={cardListChildVariants}>
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
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
export default CardList;
