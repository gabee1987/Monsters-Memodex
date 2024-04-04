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
  console.log('variants: ', variants);

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
    shuffling: {
      // Define the animation for shuffling (e.g., scale down and fade out)
      scale: 0.55,
      opacity: 0,
      transition: {
        duration: 0.7,
        type: 'spring',
        stiffness: 120,
        yoyo: 1,
        ease: customEasing,
      },
    },
    idle: {
      // Define the normal state (no shuffling)
      scale: 0.95,
      opacity: 1,
      transition: {
        duration: 0.7,
        stiffness: 120,
        yoyo: 1,
        ease: customEasing,
      },
    },
  };

  let animateState = isShuffling ? 'shuffling' : 'idle'; // Use the 'idle' state for no shuffling

  let motionVariants = isShuffling ? shufflingVariants : variants; // If not shuffling, use the provided variants for staggered animation

  return (
    <motion.div
      className={`card-container ${isPaired ? 'isPaired' : ''} ${
        isShuffling ? '' : ''
      } ${flippedOnGameOver ? 'flippedOnGameOver' : ''}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      initial="hidden"
      variants={variants}
      animate={isShuffling ? 'shuffling' : 'show'}
      whileHover={{
        scale: 1.05,
        rotate: 1.2,
        translateY: '-0.05em',
        transition: {
          type: 'spring',
          stiffness: 120,
          damping: 5,
          mass: 0.25,
          duration: 0.25,
        },
      }}
      whileTap={{
        scale: 1,
        rotate: -0.2,
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
