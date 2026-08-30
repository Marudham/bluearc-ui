import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Grow Your Business with <span>Quality Leads</span> & Modern Web Solutions</h1>
        <p>We help businesses acquire clients faster through targeted outreach, data-driven insights, and professional web development.</p>
        <Link to="/contact" className="cta-button">Contact With Us</Link>
      </div>
    </section>
  );
};

export default Hero;