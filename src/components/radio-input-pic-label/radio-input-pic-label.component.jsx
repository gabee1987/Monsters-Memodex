import './radio-input-pic-label.styles.scss';
import { backgrounds } from '../../app-themes/app-backgrounds';

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
  // Utility function to get the SVG background as a blob URL
  const getSvgBackground = (backgroundKey) => {
    // console.log('bg in radio: ', backgroundKey);
    const background = backgrounds[backgroundKey];
    return background && background.svg ? background.svg : null;
  };

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

  // Determine the image path or color based on the type of tile
  const background = backgrounds[selectedValue];
  const imagePath = isAppBackground
    ? getSvgBackground(selectedValue)
    : cardSetPicId !== null
    ? `https://robohash.org/${cardSetPicId}?set=set${cardSetId}&size=100x100`
    : getCardBackImagePath(`card-back-${selectedValue}`);
  const solidColor = isAppBackground && background ? background.color : null;

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

  const isSolidColor = backgrounds[selectedValue]?.color;

  return (
    <label
      htmlFor={id}
      className={`radio-pic-label ${
        selectedValueType === selectedValue
          ? 'radioSelected'
          : 'radioNotSelected'
      }`}
    >
      <div
        className={`radio-pic-label-container ${
          selectedValueType === selectedValue ? 'selected-radio' : ''
        }`}
        style={isSolidColor ? { backgroundColor: isSolidColor } : {}}
      >
        {imagePath ? (
          <img
            className={`radio-img ${
              isAppBackground ? 'app-bg-radio-img' : 'card-back-radio-img'
            }`}
            alt={`${isAppBackground ? 'app-bg' : 'card-back'}-${labelText}`}
            src={imagePath}
          />
        ) : solidColor ? null : (
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
