import React from 'react';
import { PlayCircle } from 'lucide-react';
import './About.css';
import aboutVideo from '../assets/runway-epochtrace-about-us-20260714-212134.mp4';

const About = () => {
  return (
    <div className="container section">
      <div className="about-layout">
        <div className="about-content">
          <h2 className="section-title text-left">Who We Are</h2>
          <p className="about-desc">
            EpochTrace is an AI data services and language technology company that builds high-quality training datasets, multilingual solutions, and intelligent data operations for global organizations.
          </p>
          <p className="about-desc">
            We combine human expertise and AI technology to deliver accurate, secure, and scalable data services that power AI models and drive digital transformation.
          </p>
          <a href="#services" className="btn btn-primary about-btn">Learn More About Us</a>
        </div>
        <div className="about-visual">
          <div className="video-placeholder">
            <video
              className="about-video-element"
              autoPlay
              muted
              loop
              playsInline
              src={aboutVideo}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
