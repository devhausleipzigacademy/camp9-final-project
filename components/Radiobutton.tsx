'use client';

const RadioButton = ({ name, id, onChange, checked }: any & FormData) => {
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
        />
        <span className="custom-radio" />
      </label>
    </>
  );
};

export default RadioButton;
