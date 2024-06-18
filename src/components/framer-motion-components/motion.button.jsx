import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/app-theme.context';
import { motion } from 'framer-motion';

import {
  getButtonHoverAnimation,
  getButtonActiveAnimation,
  getButtonExitAnimation,
  BUTTON_HOVER_TRANSITION,
} from '../../utilities/animation-helper';

const MotionButton = ({ children, onClick, className, ...props }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <motion.button
      className={`btn ${className}`}
      onClick={onClick}
      whileHover={getButtonHoverAnimation(theme)}
      whileTap={getButtonActiveAnimation(theme)}
      // initial={getButtonExitAnimation(theme)}
      exit={getButtonExitAnimation(theme)}
      // transition={BUTTON_HOVER_TRANSITION}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MotionButton;
