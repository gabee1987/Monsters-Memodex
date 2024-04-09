import React from 'react';
import { motion } from 'framer-motion';

import {
  BUTTON_HOVER_ANIMATION,
  BUTTON_ACTIVE_ANIMATION,
  BUTTON_HOVER_TRANSITION,
} from '../../utilities/animation-helper';

const MotionButton = ({ children, onClick, className, ...props }) => {
  return (
    <motion.button
      className={`btn ${className}`}
      onClick={onClick}
      whileHover={BUTTON_HOVER_ANIMATION}
      whileTap={BUTTON_ACTIVE_ANIMATION}
      transition={BUTTON_HOVER_TRANSITION}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MotionButton;
