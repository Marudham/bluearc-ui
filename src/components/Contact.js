import React from 'react';
import '../styles/components/Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>📞 Contact With Us</h2>
        <p>Ready to scale your business with quality leads and actionable insights?</p>
        {/* <a href="#contact" className="cta-button large">
          Contact With Us
        </a> */}
        
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <span>bluearc2026@gmail.com</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <span>+91 96267 95150</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;