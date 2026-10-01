import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Hero.css';

const TRUST_POINTS = [
  { icon: 'fas fa-database', label: '100% Verified B2B Data' },
  { icon: 'fas fa-bolt', label: 'Modern, Scalable Web Builds' },
  { icon: 'fas fa-headset', label: 'Dedicated Project Support' },
];

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="hero-eyebrow reveal">Lead Generation &amp; B2B Growth Partner</p>
        <h1 className="reveal" style={{ '--reveal-delay': '80ms' }}>
          Grow Your Business with <span>Quality Leads</span> &amp; Modern Web Solutions
        </h1>
        <p className="hero-subtitle reveal" style={{ '--reveal-delay': '160ms' }}>
          We help businesses acquire clients faster through targeted outreach, data-driven insights, and professional web development.
        </p>
        <div className="hero-ctas reveal" style={{ '--reveal-delay': '240ms' }}>
          <Link to="/contact" className="cta-button">Contact With Us</Link>
          <Link to="/product" className="cta-button cta-button-ghost">
            Explore ArkMail <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <ul className="hero-trust-row reveal" style={{ '--reveal-delay': '320ms' }}>
          {TRUST_POINTS.map((point) => (
            <li key={point.label}>
              <i className={point.icon}></i>
              <span>{point.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Hero;