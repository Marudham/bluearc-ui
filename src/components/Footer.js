import React from 'react';
import '../styles/components/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Bluearc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;