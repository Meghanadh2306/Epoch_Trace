import React from 'react';
import { Database, MessageSquare, Headphones, Eye, Globe2, Lightbulb, Code, Briefcase } from 'lucide-react';
import './Services.css';

const servicesData = [
  {
    icon: <Database size={32} />,
    title: 'AI Data Annotation',
    description: 'Image, video, LiDAR, and 3D annotation for computer vision models.'
  },
  {
    icon: <MessageSquare size={32} />,
    title: 'NLP Services',
    description: 'Text classification, NER, sentiment analysis and language understanding.'
  },
  {
    icon: <Headphones size={32} />,
    title: 'Audio Services',
    description: 'Speech transcription, audio labeling, and speaker identification.'
  },
  {
    icon: <Eye size={32} />,
    title: 'Computer Vision',
    description: 'Object detection, segmentation, keypoint annotation and tracking.'
  },
  {
    icon: <Globe2 size={32} />,
    title: 'Translation & Localization',
    description: 'Translation, localization, interpretation and multilingual transcription.'
  },
  {
    icon: <Lightbulb size={32} />,
    title: 'AI Consulting',
    description: 'AI strategy, data architecture, and digital transformation consulting.'
  },
  {
    icon: <Code size={32} />,
    title: 'SaaS & Software',
    description: 'Proprietary platforms, automation tools, APIs and cloud infrastructure.'
  },
  {
    icon: <Briefcase size={32} />,
    title: 'BPO & KPO',
    description: 'Data management, content moderation and business process outsourcing.'
  }
];

const Services = () => {
  return (
    <div className="container section bg-secondary">
      <div className="section-header">
        <h2 className="section-title">Our Core Services</h2>
        <p className="section-subtitle">
          End-to-end data services and AI solutions to build better intelligence
        </p>
      </div>

      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
          </div>
        ))}
      </div>
      
      <div className="services-footer">
        <div className="services-cta-banner">
          <div className="banner-text">
            <h4>Ready to build better AI with high-quality data?</h4>
            <p>Let's automate your data operations and accelerate your AI journey.</p>
          </div>
          <a href="#contact" className="btn btn-primary">Get Started</a>
        </div>
      </div>
    </div>
  );
};

export default Services;
