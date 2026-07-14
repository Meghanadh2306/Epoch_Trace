import React from 'react';
import { MessagesSquare, FileSearch, Database, PenTool, ShieldCheck, Cpu, Send } from 'lucide-react';
import './Process.css';

const processSteps = [
  { icon: <MessagesSquare size={20} />, title: '01. Consultation', desc: 'Understand requirements and define project scope.' },
  { icon: <FileSearch size={20} />, title: '02. Requirement Analysis', desc: 'Detailed requirement gathering and planning.' },
  { icon: <Database size={20} />, title: '03. Data Collection', desc: 'Collect data from diverse and reliable sources.' },
  { icon: <PenTool size={20} />, title: '04. Annotation', desc: 'Accurate annotation by trained experts.' },
  { icon: <ShieldCheck size={20} />, title: '05. Quality Assurance', desc: 'Multi-level quality checks and validation.' },
  { icon: <Cpu size={20} />, title: '06. AI Model Ready', desc: 'High quality data ready for model training.' },
  { icon: <Send size={20} />, title: '07. Delivery', desc: 'Secure delivery and continuous support.' },
];

const Process = () => {
  return (
    <div className="container section bg-secondary">
      <div className="section-header">
        <h2 className="section-title">Our Process</h2>
        <p className="section-subtitle">
          A proven process for high-quality AI data
        </p>
      </div>

      <div className="process-timeline">
        {processSteps.map((step, index) => (
          <div className="timeline-item" key={index}>
            <div className="timeline-marker">
              <div className="marker-icon">{step.icon}</div>
              {index !== processSteps.length - 1 && <div className="timeline-line"></div>}
            </div>
            <div className="timeline-content">
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
