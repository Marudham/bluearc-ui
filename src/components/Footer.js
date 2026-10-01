import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Footer.css';
import SECTIONS from '../sectionsConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img
            src={`${process.env.PUBLIC_URL}/blueark.jpeg`}
            alt="BlueArk Logo"
            className="footer-logo"
          />
          <p className="footer-tagline">
            Lead generation, B2B data, and modern web solutions for growing businesses.
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          {SECTIONS.map((section) => (
            <Link key={section.path} to={section.path}>{section.label}</Link>
          ))}
          <Link to="/product">ArkMail</Link>
          <a href="mailto:contact@blueark.co.in">contact@blueark.co.in</a>
        </nav>

        <p className="footer-copyright">
          &copy; {currentYear} BlueArk. All rights reserved.
          {' · '}
          <Link to="/campaign-assets" className="footer-internal-link">Campaign Assets</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;