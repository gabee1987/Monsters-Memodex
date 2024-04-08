import { useEffect } from 'react';
import { useState, useContext } from 'react';
import { motion } from 'framer-motion';

import { GameSettingsContext } from '../../contexts/game-settings.context.jsx';

import { cardService } from '../../services/card.service.jsx';

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

  const imageUrl = cardService.generateCardImageUrl(pictureId, cardSet, size);

  const handleClick = () => {
    // Only handle click if the card is not disabled
    if (!disabled) {
      onClick(card);
    }
  };

  // Shuffling animation with Framer Motion
  const customEasing = [0.175, 0.885, 0.32, 1.575];

  const shufflingVariants = {
    // Define the animation for shuffling (e.g., scale down and fade out)
    shuffling: {
      scale: 0,
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        // damping: 5.5,
        // mass: 0.2,
        duration: 0.7,
        // yoyo: 1,
        // ease: customEasing,
      },
    },
    idle: {
      // Define the normal state (no shuffling)
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 5.5,
        mass: 0.2,
        duration: 0.7,
        // delay: -1,
        // ease: customEasing,
      },
    },
  };

  let animateState = isShuffling ? 'shuffling' : 'idle'; // Use the 'idle' state for no shuffling
  // let motionVariants = isShuffling ? shufflingVariants : variants; // If not shuffling, use the provided variants for staggered animation

  // Define separate transition for hover effect
  const hoverTransition = {
    type: 'spring',
    stiffness: 120,
    damping: 5,
    mass: 0.25,
    duration: 0.25,
  };

  return (
    <motion.div
      className={`card-container ${isPaired ? 'isPaired' : ''}  ${
        flippedOnGameOver ? 'flippedOnGameOver' : ''
      }`}
      style={{ width: `${size}px`, height: `${size}px` }}
      initial="hidden"
      variants={shufflingVariants}
      animate={animateState}
      whileHover={{
        scale: 1.05,
        rotate: 1.2,
        translateY: '-0.05em',
        transition: hoverTransition,
      }}
      whileTap={{
        scale: 1,
        rotate: -0.2,
        transition: hoverTransition,
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
