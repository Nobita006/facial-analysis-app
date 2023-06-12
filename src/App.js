import React, { useState } from 'react';
import FacialAnalysis from './FacialAnalysis';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <div className="toggle-container">
        <span>Toggle Dark Mode</span>
        <label className="switch">
          <input type="checkbox" onChange={handleToggleDarkMode} checked={isDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
      <FacialAnalysis />
    </div>
  );
}

export default App;
