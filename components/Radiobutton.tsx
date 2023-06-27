'use client';

const RadioButton = ({ name, id, onChange, checked, value }: any & FormData) => {
  return (
    <>
      <label htmlFor={id}>
        <input
          className="radio-input"
          type="radio"
          name={name}
          id={id}
          onChange={onChange}
          checked={checked}
          value={value}
        />
        <span className="custom-radio" />
      </label>
    </>
  );
};

export default RadioButton;
