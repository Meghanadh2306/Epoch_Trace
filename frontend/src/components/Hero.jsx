import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero dark-section">
      <div className="hero-background">
        <div className="globe-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <h1 className="hero-title">
          Transforming Data<br />
          into <span className="text-accent">AI Intelligence.</span>
        </h1>
        
        <p className="hero-subtitle text-secondary">
          High-quality training data, multilingual solutions, and AI services that power the next generation of artificial intelligence.
        </p>
        
        <div className="hero-actions">
          <a href="#services" className="btn btn-primary">Explore Services</a>
          <a href="#contact" className="btn btn-outline">Contact Us</a>
        </div>
      </div>

      <div className="hero-trusted">
        <div className="container">
          <p className="trusted-text">Trusted by innovative companies worldwide</p>
          <div className="trusted-logos">
            <span className="logo-placeholder">Google</span>
            <span className="logo-placeholder">Microsoft</span>
            <span className="logo-placeholder">Meta</span>
            <span className="logo-placeholder">amazon</span>
            <span className="logo-placeholder">NVIDIA</span>
            <span className="logo-placeholder">TESLA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
