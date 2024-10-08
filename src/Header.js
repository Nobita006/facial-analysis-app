import React from 'react';
import './Header.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"> My Facial Feature</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="https://nobita006.github.io/Sayan_Portfolio/" target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.linkedin.com/in/sayandas1/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/Nobita006/facial-analysis-app/" target="_blank" rel="noopener noreferrer">
                GitHub Source
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.fiverr.com/sayan_on" target="_blank" rel="noopener noreferrer">
                Fiverr Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://youtu.be/cI56twvRbac" target="_blank" rel="noopener noreferrer">
                Video Demonstration
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
