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
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="toggle-container d-flex justify-content-end align-items-center">
              <span className="mr-2">Toggle Dark Mode</span>
              <label className="switch">
                <input type="checkbox" onChange={handleToggleDarkMode} checked={isDarkMode} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <FacialAnalysis />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
