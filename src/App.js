import React, { useState } from 'react';
import FacialAnalysis from './FacialAnalysis';
import './App.css';
import Chatbot from './Chatbot';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className="toggle-container d-flex justify-content-end align-items-center">
          <span className="mr-2"></span>
          {/* <label className="switch">
            <input type="checkbox" onChange={handleToggleDarkMode} checked={isDarkMode} />
            <span className="slider round"></span>
          </label> */}
        </div>
        <div className="row">
          <div className="col-12">
            <FacialAnalysis />
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
}

export default App;
