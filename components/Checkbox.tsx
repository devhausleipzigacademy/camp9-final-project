'use client';
import { type } from 'os';
import React, { useState } from 'react';

type CheckboxProps = {
  label: string;
  onChange?: (checked: boolean) => void;
};

const Checkbox = ({ label, onChange }: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <label>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {label}
    </label>
  );
};

export default Checkbox;
