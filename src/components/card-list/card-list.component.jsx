import { useState, useEffect } from 'react';

import Card from '../card/card.component.jsx';

import './card-list.styles.scss';

const CardList = ({
  cards,
  handleChoice,
  firstChoice,
  secondChoice,
  isShufflingActive,
  disabled,
}) => {
  const [cardSize, setCardSize] = useState(250); // default size
  // const [columns, setColumns] = useState(4);
  // const [rows, setRows] = useState(4);
  const minCardSize = 50; // minimum card size
  const maxCardSize = 250; // maximum card size
  const gapSize = 10; // space between cards

  const adjustCardSize = () => {
    // const cardListContainer = document.querySelector('.card-list-container');
    // const navigationBar = document.querySelector('.navigation');
    // const gameControls = document.querySelector('.button-container');
    // if (!cardListContainer || !navigationBar || !gameControls) return;
    // const containerWidth = cardListContainer.offsetWidth;
    // const navHeight = navigationBar.offsetHeight;
    // const controlsHeight = gameControls.offsetHeight;
    // const containerHeight = window.innerHeight - navHeight - controlsHeight;
    // let cardWidth = maxCardSize;
    // let maxCardPerRow = Math.floor(containerWidth / cardWidth);
    // let maxIterations = 100; // Safeguard
    // while (
    //   (maxCardPerRow * (cardWidth + gapSize) - gapSize > containerWidth ||
    //     Math.ceil(cards.length / maxCardPerRow) * (cardWidth + gapSize) -
    //       gapSize >
    //       containerHeight) &&
    //   maxIterations > 0
    // ) {
    //   cardWidth -= 5; // decrement card width
    //   maxCardPerRow = Math.floor(containerWidth / (cardWidth + gapSize));
    //   maxIterations--;
    // }
    // cardWidth = Math.max(cardWidth, minCardSize); // enforce minimum card size
    // setCardSize(Math.floor(cardWidth));

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const cardListContainer = document.querySelector('.card-list-container');
    const navigationBar = document.querySelector('.navigation');
    const gameControls = document.querySelector('.button-container');
    if (!cardListContainer || !navigationBar || !gameControls) return;

    // Estimate heights of other components (Navigation and GameControls)
    const navHeight = 60; // example height
    const controlHeight = 100; // example height

    const availableHeight = screenHeight - navHeight - controlHeight;

    let currentCardSize = maxCardSize;
    let columns = Math.floor(screenWidth / (currentCardSize + gapSize));
    let rows = Math.ceil(cards.length / columns);
    let totalHeight = rows * (currentCardSize + gapSize);

    while (totalHeight > availableHeight && currentCardSize > minCardSize) {
      currentCardSize -= 10; // decrement size
      columns = Math.floor(screenWidth / (currentCardSize + gapSize));
      rows = Math.ceil(cards.length / columns);
      totalHeight = rows * (currentCardSize + gapSize);
    }

    setCardSize(currentCardSize);
    // setColumns(columns);
    // setRows(rows);
  };

  useEffect(() => {
    adjustCardSize();
    window.addEventListener('resize', adjustCardSize);

    return () => {
      window.removeEventListener('resize', adjustCardSize);
    };
  }, [cards.length]);

  // Adjust grid layout
  useEffect(() => {
    const cardList = document.querySelector('.card-list');
    if (cardList) {
      // cardList.style.gridTemplateColumns = `repeat(${columns}, ${cardSize}px)`;
      // cardList.style.gridTemplateRows = `repeat(${rows}, ${cardSize}px)`;
      cardList.style.gridTemplateColumns = `repeat(auto-fill, minmax(${cardSize}px, 1fr))`;
    }
  }, [cardSize]);

  return (
    <div className="card-list-container">
      <div className="card-list">
        {cards.map((card) => {
          return (
            <Card
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
          );
        })}
      </div>
    </div>
  );
};
export default CardList;
