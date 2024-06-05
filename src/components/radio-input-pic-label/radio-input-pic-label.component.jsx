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
        {isAppBackground ? (
          <img
            className={`app-bg-radio-img ${
              selectedValueType === selectedValue ? 'selected-app-bg' : ''
            }`}
            alt={`app-bg-${labelText}`}
            src={require(`../../assets/bg/${selectedValue}.png`)}
          />
        ) : cardSetPicId !== null ? (
          <img
            className={`card-set-radio-img ${
              selectedValueType === selectedValue ? 'selected-card-set' : ''
            }`}
            alt={`card-set-${labelText}`}
            src={`https://robohash.org/${cardSetPicId}?set=set${cardSetId}&size=100x100`}
          />
        ) : (
          <img
            className={`card-back-radio-img ${
              selectedValueType === selectedValue ? 'selected-card-back' : ''
            }`}
            alt={`card-back-${labelText}`}
            src={require(`../../assets/card-back-${selectedValue}.png`)}
          />
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
