'use client';
import { useFormContext } from 'react-hook-form';

const RadioButton = ({
  name,
  id,
  value,
  onChange,
  checked,
}: any & FormData) => {
  const { setValue } = useFormContext(); // retrieve all hook methods
  return (
    <>
      <label htmlFor={id}>
        <input
          className="radio-input"
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <span
          className="custom-radio"
          onClick={() => {
            setValue('anonymity', value); // ✅
          }}
        />
      </label>
    </>
  );
};

export default RadioButton;
