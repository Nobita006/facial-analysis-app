import React, { useState } from 'react';
import FacialAnalysis from './FacialAnalysis';
import './App.css';
import Chatbot from './Chatbot';
import Header from './Header'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <Header />
    <div className={`App ${isDarkMode ? 'dark' : ''}`}>
      
      <div className="container-fluid"> {/* Use container-fluid for full-width responsiveness */}
        <div className="toggle-container d-flex justify-content-end align-items-center">
          <span className="mr-2"></span>
          {/* <label className="switch">
            <input type="checkbox" onChange={handleToggleDarkMode} checked={isDarkMode} />
            <span className="slider round"></span>
          </label> */}
        </div>
        <div className="row justify-content-center"> {/* Center-align content */}
          <div className="col-12 col-md-8 col-lg-6"> {/* Take full width on mobile, smaller width on larger screens */}
            <FacialAnalysis />
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
    </div>
  );
}

export default App;
