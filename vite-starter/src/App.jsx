import React, { useState } from 'react';
import './App.css';

function App() {
  const [btnColor, setBtnColor] = useState('red');
  const [isDisabled, setIsDisabled] = useState(false);
  const nextColor = btnColor === 'red' ? 'blue' : 'red';
  
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
      <button onClick={handleColorChange} className={btnColor} disabled={isDisabled}>Change to {nextColor}</button>
      </div>
      <div>
        <input type='checkbox' onClick={handleCheckBoxClick} id="disable-btn" name="disable button" />
        <label htmlFor="disable-btn">Disable button</label>
      </div>
    </>
  );
}

export default App;
