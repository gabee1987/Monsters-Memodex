import './radio-input-pic-label.styles.scss';

const RadioInputPicLabel = ({
  id,
  selectedValueType,
  selectedValue,
  labelText,
  onChangeHandler,
  cardSetId,
  cardSetPicId,
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
        className={`settings-cardset-label-container ${
          selectedValueType === selectedValue ? 'selected-card-set' : ''
        }`}
      >
        <img
          alt={`card-set-${labelText}`}
          src={`https://robohash.org/${cardSetPicId}?set=set${cardSetId}&size=100x100`}
        />
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
