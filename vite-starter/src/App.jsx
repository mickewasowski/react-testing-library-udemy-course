import React, { useState } from 'react';
import './App.css';
import { kebabCaseToTitleCase } from './utils';

function App() {
  const [btnColor, setBtnColor] = useState('medium-violet-red');
  const [isDisabled, setIsDisabled] = useState(false);
  const nextColor = btnColor === 'medium-violet-red' ? 'midnight-blue' : 'medium-violet-red';
  const colorName = kebabCaseToTitleCase(nextColor);

  const handleColorChange = (event) => {
    event.preventDefault();
    setBtnColor(nextColor);
  }

  const handleCheckBoxClick = (event) => {
    const isChecked = event.target.checked;
    setIsDisabled(isChecked);
  }

  return (
    <>
      <div>
      <button onClick={handleColorChange} className={isDisabled ? 'grey' : btnColor} disabled={isDisabled}>Change to {colorName}</button>
      </div>
      <div>
        <input type='checkbox' onClick={handleCheckBoxClick} id="disable-btn" name="disable button" />
        <label htmlFor="disable-btn">Disable button</label>
      </div>
    </>
  );
}

export default App;
