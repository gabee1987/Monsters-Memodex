const scrollContainers = document.querySelectorAll(
  '.horizontal-scroll-container'
);
console.log('horizontal divs: ', scrollContainers);

scrollContainers.forEach((container) => {
  container.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    container.scrollLeft += evt.deltaY;
  });
});

console.log('horizontal-helper file loaded...');

export const enableHorizontalScrolling = (containerSelector) => {
  const scrollContainers = document.querySelectorAll(containerSelector);

  scrollContainers.forEach((container) => {
    container.addEventListener('wheel', (evt) => {
      evt.preventDefault();
      container.scrollLeft += evt.deltaY;
    });
  });

  console.log('Horizontal scrolling enabled...');
};

export const disableHorizontalScrolling = (containerSelector) => {
  const scrollContainers = document.querySelectorAll(containerSelector);

  scrollContainers.forEach((container) => {
    container.removeEventListener('wheel', (evt) => {
      evt.preventDefault();
      container.scrollLeft += evt.deltaY;
    });
  });

  console.log('Horizontal scrolling disabled...');
};
