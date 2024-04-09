// Dynamically calculating the stagger animation delay for cards when appearing
// Configurable constants for stagger animation
const minCardCount = 4;
const maxCardCount = 40;
const minDelay = 0.15; // Higher delay for fewer cards
const maxDelay = 0.05; // Lower delay for more cards

// Linear interpolation formula to calculate stagger delay
export const calculateStaggerDelay = (cardCount) => {
  // Clamp cardCount to be within minCardCount and maxCardCount
  cardCount = Math.max(minCardCount, Math.min(cardCount, maxCardCount));

  return (
    minDelay +
    (maxDelay - minDelay) *
      ((cardCount - minCardCount) / (maxCardCount - minCardCount))
  );
};
