import React from 'react';

function Controller() {
  return (
    <div>
      <label></label>
      <input type="range" min="0" max="100" step="10" list="values"></input>
      <br />
      <p>
        Value: <output id="value"></output>
      </p>
      <datalist id="values">
        <option value="0" label="0">
          0
        </option>
        <option value="50" label="50">
          50
        </option>
        <option value="100" label="100">
          100
        </option>
      </datalist>
    </div>
  );
}

export default Controller;
