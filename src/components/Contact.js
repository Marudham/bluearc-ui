import React, { useState } from 'react';
import '../styles/components/Contact.css';

const CONTACT_EMAIL = 'contact@blueark.co.in';
// Web3Forms access keys are meant to be embedded client-side (see web3forms.com docs) —
// they're rate-limited and tied to the destination inbox, not a secret credential.
const WEB3FORMS_ACCESS_KEY = '2be05326-6720-465e-b55d-0196a0bc67d6';

const initialFormState = {
  firstName: '',
  lastName: '',
  businessEmail: '',
  phoneNumber: '',
  companyName: '',
  message: ''
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const { firstName, lastName, businessEmail, phoneNumber, companyName, message } = formData;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New inquiry from ${firstName} ${lastName}`.trim(),
          name: `${firstName} ${lastName}`.trim(),
          email: businessEmail,
          phone: phoneNumber || 'N/A',
          company: companyName || 'N/A',
          message
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData(initialFormState);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>📞 Contact With Us</h2>
        <p>Ready to scale your business with quality leads and actionable insights?</p>

        <div className="contact-info">
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <a href="tel:+919626795150" className="contact-link">
              +91 96267 95150
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Honeypot field for Web3Forms spam protection — kept empty by real users, hidden via CSS */}
          <input type="checkbox" name="botcheck" className="form-honeypot" tabIndex="-1" autoComplete="off" />

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="email"
                name="businessEmail"
                placeholder="Business Email"
                value={formData.businessEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder="Tell us about your lead generation goals and current challenges..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="form-submit-button" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="form-status form-status-success">
              ✅ Thanks! Your message has been sent — we'll get back to you shortly.
            </p>
          )}

          {status === 'error' && (
            <p className="form-status form-status-error">
              ⚠️ Something went wrong sending your message. Please try again, or email us directly at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link">{CONTACT_EMAIL}</a>.
            </p>
          )}
        </form>

        <div className="contact-cta">
          <h3>Or Schedule a Strategy Call</h3>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Schedule a Strategy Call')}`}
            className="contact-cta-button"
          >
            Book a Strategy Call
          </a>
          <p className="schedule-subtext">Book a 30-minute consultation to discuss your business growth needs</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
