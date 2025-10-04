import React from 'react';
import '../styles/components/Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>📞 Contact With Us</h2>
        <p>Ready to scale your business with quality leads and actionable insights?</p>
        
        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <a href="mailto:bluearc2026@gmail.com" className="contact-link">
              bluearc2026@gmail.com
            </a>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <a href="tel:+919626795150" className="contact-link">
              +91 96267 95150
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;