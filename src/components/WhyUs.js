import React from 'react';
import '../styles/components/WhyUs.css';

const WhyUs = () => {
  const benefits = [
    '100% Verified B2B Data',
    'Focused on Client Acquisition',
    'Modern, Scalable Web Solutions',
    'BI Reporting for Data-Driven Decisions',
    'Affordable Packages with High ROI',
    'Dedicated Support for Every Project'
  ];

  return (
    <section id='why-us' className="why-us">
      <div className="container">
        <h2>🌟 Why Work With Bluearc?</h2>
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <i className="fas fa-check-circle"></i>
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;