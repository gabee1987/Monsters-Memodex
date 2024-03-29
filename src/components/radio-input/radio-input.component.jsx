import './radio-input.styles.scss';

const RadioInput = ({
  id,
  selectedValueType,
  selectedValue,
  labelText,
  onChangeHandler,
  disabled,
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
      {labelText}
      <input
        id={id}
        type="radio"
        name={selectedValueType}
        value={selectedValue}
        checked={selectedValueType === selectedValue}
        onChange={onChangeHandler}
        disabled={disabled}
      />
    </label>
  );
};

export default RadioInput;
