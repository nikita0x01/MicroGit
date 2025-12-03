import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import githubLogo from "../assets/github-mark-white.svg"; // Updated import
import "./navbar-enhanced.css";

const NavbarEnhanced = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setShowDropdown(false);
    navigate("/auth");
  };

  const userName = localStorage.getItem("userName") || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
  <img
    src={githubLogo}
    alt="GitHub Logo"
    className="logo-icon"
  />
  <span className="logo-text">MicroGit</span>
</Link>


      {/* Navigation Links */}
      <div className={`navbar-nav ${showMobileMenu ? "active" : ""}`}>
        <Link to="/">Overview</Link>
        <Link to="/repositories">Repositories</Link>
        <Link to="/issues">Issues</Link>
        <Link to="/profile">Profile</Link>
      </div>

      {/* Right Actions */}
      <div className="navbar-actions">
        {/* Search */}
        <div className="navbar-search">
          <input type="text" placeholder="Search repositories..." />
        </div>

        {/* User Dropdown */}
        <div className="navbar-user">
          <div
            className="navbar-avatar"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {userInitial}
          </div>

          {showDropdown && (
            <div className="navbar-dropdown">
              <Link to="/profile">Your Profile</Link>
              <button onClick={() => navigate("/profile")}>Settings</button>
              <div className="navbar-dropdown-divider"></div>
              <button
                onClick={handleLogout}
                style={{ color: "var(--accent-red)" }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          [MENU]
        </button>
      </div>
    </nav>
  );
};

export default NavbarEnhanced;
