// ===================================================
// =================== Animation Constants
// ===================================================
// Stagger Animation for Card List
export const CARD_LIST_STAGGER = {
  minCardCount: 4,
  maxCardCount: 40,
  minDelay: 0.15,
  maxDelay: 0.05,
};

// Hover Animation for Card
export const CARD_HOVER_ANIMATION = {
  scale: 1.08,
  rotate: 1.4,
  translateY: '-0.1em',
};

// Transition settings for Hover Animation
export const CARD_HOVER_TRANSITION = {
  type: 'spring',
  stiffness: 200,
  damping: 6.5,
  mass: 0.25,
  duration: 0.25,
};

// Click Animation for Card
export const CARD_CLICK_ANIMATION = {
  scale: 1,
  rotate: -1.4,
};

// Constants for button hover and active animations
export const BUTTON_HOVER_TRANSITION = {
  type: 'spring',
  stiffness: 200,
  damping: 6.5,
  mass: 0.25,
  duration: 0.25,
};

// Custom easing for color transition
export const COLOR_TRANSITION = {
  type: 'spring',
  stiffness: 200,
  damping: 6,
  mass: 0.25,
  duration: 0.2,
};

// Tween-based color transition for exit
export const COLOR_TRANSITION_EXIT = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.1,
};

export const getButtonHoverAnimation = (theme) => ({
  translateY: '-0.05em',
  scale: 1.08,
  rotate: 1.4,
  boxShadow: '5px 5px 20px 5px rgba(0, 0, 0, 0.5)',
  backgroundColor: theme.hoverText,
  color: theme.menu,
  transition: {
    scale: BUTTON_HOVER_TRANSITION,
    rotate: BUTTON_HOVER_TRANSITION,
    translateY: BUTTON_HOVER_TRANSITION,
    backgroundColor: COLOR_TRANSITION,
    color: COLOR_TRANSITION,
  },
});

// Define the exit animation
export const getButtonExitAnimation = (theme) => ({
  translateY: '0em',
  scale: 1,
  rotate: 0,
  boxShadow: 'none',
  backgroundColor: theme.primaryText,
  color: theme.menu,
  transition: {
    scale: BUTTON_HOVER_TRANSITION,
    rotate: BUTTON_HOVER_TRANSITION,
    translateY: BUTTON_HOVER_TRANSITION,
    backgroundColor: COLOR_TRANSITION_EXIT,
    color: COLOR_TRANSITION_EXIT,
  },
});

export const getButtonActiveAnimation = (theme) => ({
  scale: 1,
  rotate: -0.4,
  transition: {
    scale: {
      duration: 0.15,
      ease: [0.175, 0.885, 0.32, 1.675],
    },
    rotate: {
      duration: 0.15,
      ease: [0.175, 0.885, 0.32, 1.675],
    },
  },
  backgroundColor: theme.activeText,
  color: theme.disabledText,
});

// Custom Easing for Animations
const CUSTOM_EASING = [0.175, 0.885, 0.32, 1.575];

// ===================================================
// =================== ANIMATION HELPER UTILITIES
// ===================================================

// =================================================== FOR CARD LIST COMPONENT
// Linear interpolation formula to calculate stagger delay
export const calculateCardListStaggerDelay = (
  cardCount,
  isNeedStaggerAnimation
) => {
  // Return 0 delay if stagger animation is not needed
  if (!isNeedStaggerAnimation) {
    return 0;
  }

  // Clamp cardCount to the defined range
  cardCount = Math.max(
    CARD_LIST_STAGGER.minCardCount,
    Math.min(cardCount, CARD_LIST_STAGGER.maxCardCount)
  );

  // Calculate the stagger delay
  return (
    CARD_LIST_STAGGER.minDelay +
    (CARD_LIST_STAGGER.maxDelay - CARD_LIST_STAGGER.minDelay) *
      ((cardCount - CARD_LIST_STAGGER.minCardCount) /
        (CARD_LIST_STAGGER.maxCardCount - CARD_LIST_STAGGER.minCardCount))
  );
};

export const calculateCardListChildrenDelay = (isNeedStaggerAnimation) => {
  return isNeedStaggerAnimation ? 1.5 : 0;
};

export const getCardListParentVariants = (staggerDelay, childrenDelay) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childrenDelay,
    },
  },
});

export const cardListChildVariants = {
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
    },
  },
};

// =================================================== FOR CARD COMPONENT
export const cardShufflingVariants = {
  // Define the animation for shuffling (e.g., scale down and fade out)
  shuffling: {
    scale: 0,
    opacity: 0,
    transition: {
      // type: 'spring',
      // type: 'tween',
      // stiffness: 100,
      // damping: 5.5,
      // mass: 0.2,
      // duration: 0.7,
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
      stiffness: 100,
      damping: 5.5,
      mass: 0.2,
      duration: 0.7,
      // delay: 0.2,
      // ease: customEasing,
    },
  },
};

// =================================================== FOR GAME CONTROL COMPONENT
export const getGameControlParentVariants = (isNeedStaggerAnimation) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: isNeedStaggerAnimation ? 0.3 : 0,
      delayChildren: isNeedStaggerAnimation ? 0.7 : 0,
    },
  },
});

export const gameControlButtonVariants = {
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
    },
  },
};

// =================================================== FOR NAV COMPONENT
export const navigationVariants = {
  initial: { rotateX: 110, opacity: 0 },
  animate: { rotateX: 0, opacity: 1 },
  exit: { rotateX: 110, opacity: 0 },
};

export const navigationTransition = {
  duration: 2.5,
  type: 'spring',
  stiffness: 100,
};

export const navTextVariants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1 },
  exit: { scale: 0.5, opacity: 0 },
};

// =================================================== FOR NAV COMPONENT
export const letterAnimationVariants = {
  animate: {
    scale: [1, 1.08, 1],
    rotate: [0, 1.4, 0],
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 6.5,
      mass: 0.25,
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 0.8,
    },
  },
};
