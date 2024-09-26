import React from 'react';
import './Header.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"> My Facial Feature Analysis</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="https://your-portfolio-link.com" target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://linkedin.com/in/your-linkedin-id" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/your-github-repo" target="_blank" rel="noopener noreferrer">
                GitHub Source
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
