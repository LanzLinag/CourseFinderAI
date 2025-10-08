// src/components/Navbar.jsx
import React from "react";
import "../css/navbar.css";

function Navbar() {
  const logoPath = "/pathfinder-logo.png"; 

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <img src={logoPath} alt="Path Finder Logo" className="navbar-logo" />
          <span className="navbar-title">Path Finder</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;