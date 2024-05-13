// Helper method to dynamically adjust the size of the cards based on the number of cards
//(Fewer cards means bigger size, more cards means smaller size)
const minCardSize = 50;
const maxCardSize = 250;
const gapSize = 20;
const loopLimit = 100;

export const adjustCardSize = (screenWidth, screenHeight, cardCount) => {
  const navigationBar = document.querySelector('.nav-container');
  const gameControls = document.querySelector('.game-control-button-container');

  if (!navigationBar || !gameControls) return maxCardSize;

  const navHeight = navigationBar.offsetHeight;
  const controlsHeight = gameControls.offsetHeight;
  const availableHeight = screenHeight - navHeight - controlsHeight;

  let currentCardSize = maxCardSize;
  let columns, rows, totalHeight;

  let iterations = 0;

  do {
    columns = Math.floor(screenWidth / (currentCardSize + gapSize));
    rows = Math.ceil(cardCount / columns);
    totalHeight = rows * (currentCardSize + gapSize);
    currentCardSize -= 10;
    iterations++;
  } while (
    totalHeight > availableHeight &&
    currentCardSize > minCardSize &&
    iterations < loopLimit
  );

  return iterations < loopLimit ? currentCardSize : maxCardSize;
};
