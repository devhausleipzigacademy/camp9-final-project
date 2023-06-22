'use client';

import React, { useState } from 'react';

const RadioButton = ({ name, id, value, onChange, checked, text }: any) => {
  return (
    <label htmlFor={id} className="radio-label">
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
      />
    </label>
  );
};

export default RadioButton;