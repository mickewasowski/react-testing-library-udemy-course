import React, { useState } from 'react';
import './App.css';

function App() {
  const [btnColor, setBtnColor] = useState('red');
  const nextColor = btnColor === 'red' ? 'blue' : 'red';
  
  const handleColorChange = (event) => {
    event.preventDefault();
    setBtnColor(nextColor);
  }

  return (
    <div>
     <button onClick={handleColorChange} className={btnColor}>Change to {nextColor}</button>
    </div>
  );
}

export default App;
