import React, { useState, useEffect } from 'react';
import '../styles/components/Header.css';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkTheme, toggleTheme, themeTitle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav">
        <div className="logo">
          <img 
            src={`${process.env.PUBLIC_URL}/blueark.jpeg`} 
            alt="BlueArc Logo" 
            className="logo-image"
          />
          <h2>BlueArc</h2>
        </div>
        
        <div className="nav-right">
          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#home" onClick={handleNavLinkClick}>Home</a></li>
            <li><a href="#services" onClick={handleNavLinkClick}>Services</a></li>
            <li><a href="#why-us" onClick={handleNavLinkClick}>Why Us?</a></li>
            <li><a href="#contact" onClick={handleNavLinkClick}>Contact</a></li>
          </ul>
          
          <div className="theme-toggle-container">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label={themeTitle}
            >
              <i className={`fas ${isDarkTheme ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <span className="theme-title">{themeTitle}</span>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;