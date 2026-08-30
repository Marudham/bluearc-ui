import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Header.css';
import { useTheme } from '../context/ThemeContext';
import SECTIONS from '../sectionsConfig';

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
            alt="BlueArk Logo"
            className="logo-image"
            title='BlueArk'
          />
          {/* <h2 style={{ color: '#013B7A' }}>BlueArk</h2> */}
        </div>
        
        <div className="nav-right">
          <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {SECTIONS.map((section) => (
              <li key={section.path}>
                <Link to={section.path} onClick={handleNavLinkClick}>{section.label}</Link>
              </li>
            ))}
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