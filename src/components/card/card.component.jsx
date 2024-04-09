import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { motion } from 'framer-motion';

import { GameStateContext } from '../../contexts/game-state.context.jsx';
import { GameSettingsContext } from '../../contexts/game-settings.context.jsx';

import { cardService } from '../../services/card.service.jsx';
import {
  cardShufflingVariants,
  CARD_HOVER_ANIMATION,
  CARD_CLICK_ANIMATION,
  CARD_HOVER_TRANSITION,
} from '../../utilities/animation-helper.js';

import './card.styles.scss';

const Card = ({
  card,
  onClick,
  flipped,
  isShuffling,
  disabled,
  size,
  variants,
}) => {
  const { id, pictureId, isPaired, flippedOnGameOver } = card;
  const { cardSet } = useContext(GameSettingsContext);
  const { cardBack } = useContext(GameSettingsContext);
  const { isShufflingActive, setIsShufflingActive } =
    useContext(GameStateContext);

  const imageUrl = cardService.generateCardImageUrl(pictureId, cardSet, size);

  const handleClick = () => {
    // Only handle click if the card is not disabled
    if (!disabled) {
      onClick(card);
    }
  };

  let animateState = isShuffling ? 'shuffling' : 'idle'; // Use the 'idle' state for no shuffling

  // This function gets called when shuffling animation in CardList completes
  const onShuffleComplete = () => {
    // console.log('Shuffling complete');
    if (isShufflingActive) {
      // setTimeout(() => console.log('Shuffling complete'), 800);
      setIsShufflingActive(false);
      // setTimeout(() => setIsShufflingActive(false), 800); // Resets the shuffling state
    }
  };

  return (
    <motion.div
      className={`card-container ${isPaired ? 'isPaired' : ''}  ${
        flippedOnGameOver ? 'flippedOnGameOver' : ''
      }`}
      style={{ width: `${size}px`, height: `${size}px` }}
      initial="hidden"
      variants={cardShufflingVariants}
      animate={animateState}
      whileHover={CARD_HOVER_ANIMATION}
      whileTap={CARD_CLICK_ANIMATION}
      transition={CARD_HOVER_TRANSITION}
      onAnimationComplete={() => {
        if (isShuffling) {
          onShuffleComplete(); // Inform state component that shuffling is done
        }
      }}
      // TODO need to create click animation here
    >
      <div className={`card-body ${flipped ? 'flipped' : ''}`}>
        <div className="card-front">
          <img id={pictureId} alt={`card-${id}`} src={imageUrl} />
        </div>
        <div
          className={`card-back type-${cardBack}`}
          onClick={handleClick}
        ></div>
      </div>
    </motion.div>
  );
};

export default Card;
