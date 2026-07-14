import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    companyName: '',
    serviceInterest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        access_key: "d49c18e0-d0bc-476e-87ed-619fd59f89e0"
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          emailAddress: '',
          companyName: '',
          serviceInterest: '',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container section">
        <div className="section-header">
          <h2 className="section-title">Contact Us</h2>
        </div>
        
        <div className="contact-layout">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <p className="contact-desc">We'd love to hear from you.</p>
            
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon"><MapPin size={20} /></div>
                <div>
                  <h5>Head Office</h5>
                  <p>123 AI Park, Innovation Street<br />Bangalore, India - 560001</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Mail size={20} /></div>
                <div>
                  <h5>Email</h5>
                  <p>info@epochtrace.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Phone size={20} /></div>
                <div>
                  <h5>Phone</h5>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><Clock size={20} /></div>
                <div>
                  <h5>Working Hours</h5>
                  <p>Mon-Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We will get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailAddress">Email Address</label>
                    <input type="email" id="emailAddress" placeholder="john@company.com" value={formData.emailAddress} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input type="text" id="companyName" placeholder="Your Company" value={formData.companyName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="serviceInterest">Service Interested In</label>
                    <select id="serviceInterest" value={formData.serviceInterest} onChange={handleChange}>
                      <option value="">Select Service</option>
                      <option value="Data Collection">Data Collection</option>
                      <option value="Data Annotation">Data Annotation</option>
                      <option value="RLHF">RLHF</option>
                      <option value="Computer Vision">Computer Vision</option>
                      <option value="Generative AI">Generative AI</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea id="message" rows="4" placeholder="How can we help you?" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <footer className="footer dark-section">
        <div className="container footer-content">
          <div className="footer-brand-col">
            <div className="new-footer-logo">
              <div className="diamond-icon"><div className="cyan-dot"></div></div>
              <div className="logo-text">
                <h3>EpochTrace</h3>
                <span>AI DATA SERVICES</span>
              </div>
            </div>
            <p className="brand-desc">Precision data labeling, annotation, and AI training data services for teams building the next generation of intelligent systems.</p>
            <div className="footer-social-boxes">
              <a href="#" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-1.2-.4-2.2-1-3 2.5-.3 5-1.2 5-5.5 0-1.2-.4-2.2-1.1-3.1.1-.3.5-1.5-.1-3.1 0 0-1-.3-3.3 1.2a11.5 11.5 0 0 0-6 0C6.3 2.8 5.3 3 5.3 3c-.6 1.6-.2 2.8-.1 3.1-.7.9-1.1 1.9-1.1 3.1 0 4.3 2.5 5.2 5 5.5-.6.6-1 1.6-1 3v3.8"/></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links-col">
            <h4 className="cyan-title">SERVICES</h4>
            <ul>
              <li><a href="#">Data Collection</a></li>
              <li><a href="#">Data Annotation</a></li>
              <li><a href="#">Data Labeling</a></li>
              <li><a href="#">RLHF</a></li>
              <li><a href="#">Validation</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="cyan-title">SOLUTIONS</h4>
            <ul>
              <li><a href="#">Computer Vision</a></li>
              <li><a href="#">Conversational AI</a></li>
              <li><a href="#">Generative AI</a></li>
              <li><a href="#">Healthcare AI</a></li>
              <li><a href="#">ADAS</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4 className="cyan-title">COMPANY</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Trust & Security</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="container bottom-content">
            <p className="text-secondary">&copy; 2026 EPOCHTRACE LABS, INC. ALL RIGHTS RESERVED.</p>
            <div className="bottom-links text-secondary">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Trust Center ↗</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
