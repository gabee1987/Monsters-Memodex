import './radio-input-pic-label.styles.scss';

const RadioInputPicLabel = ({
  id,
  selectedValueType,
  selectedValue,
  labelText,
  onChangeHandler,
  cardSetId,
  cardSetPicId,
  isAppBackground,
}) => {
  // Utility function to determine the correct image path for card backs
  const getCardBackImagePath = (path) => {
    try {
      return require(`../../assets/card/${path}.png`);
    } catch {
      try {
        return require(`../../assets/card/${path}.svg`);
      } catch {
        console.error(`Image not found: ${path}`);
        return null;
      }
    }
  };

  // Utility function to determine the correct image path
  const getAppBackgroundImagePath = (path) => {
    try {
      return require(`../../assets/bg/${path}.png`);
    } catch {
      try {
        return require(`../../assets/bg/${path}.svg`);
      } catch {
        console.error(`Image not found: ${path}`);
        return null;
      }
    }
  };

  // Determine the image path based on the type of tile
  const imagePath = isAppBackground
    ? getAppBackgroundImagePath(selectedValue)
    : cardSetPicId !== null
    ? `https://robohash.org/${cardSetPicId}?set=set${cardSetId}&size=100x100`
    : getCardBackImagePath(`card-back-${selectedValue}`);

  // Generate fallback SVG
  const fallbackSVG = (
    <svg
      width="100"
      height="100"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <rect width="100" height="100" fill="gray" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize="10"
      >
        Image Not Found
      </text>
    </svg>
  );

  return (
    <label
      htmlFor={id}
      className={`radio-label ${
        selectedValueType === selectedValue
          ? 'radioSelected'
          : 'radioNotSelected'
      }`}
    >
      <div
        className={`settings-pic-label-container ${
          selectedValueType === selectedValue ? 'selected-card-set' : ''
        }`}
      >
        {imagePath ? (
          <img
            className={`${
              isAppBackground ? 'app-bg-radio-img' : 'card-back-radio-img'
            } ${selectedValueType === selectedValue ? 'selected-app-bg' : ''}`}
            alt={`${isAppBackground ? 'app-bg' : 'card-back'}-${labelText}`}
            src={imagePath}
          />
        ) : (
          fallbackSVG
        )}
      </div>
      <input
        id={id}
        type="radio"
        name={selectedValueType}
        value={selectedValue}
        checked={selectedValueType === selectedValue}
        onChange={onChangeHandler}
      />
    </label>
  );
};

export default RadioInputPicLabel;
