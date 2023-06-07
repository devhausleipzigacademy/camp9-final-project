import React from 'react';

interface Props {
  label: string;
}

function InputField(props: Props) {
  return (
    <div>
      <p>{props.label}</p>
      <input type="text" className='border'></input>
    </div>
  );
}

export default InputField;
