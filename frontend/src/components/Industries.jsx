import React from 'react';
import { 
  HeartPulse, 
  Landmark, 
  ShoppingCart, 
  Car, 
  Sprout, 
  Factory,
  Building,
  GraduationCap,
  Truck,
  MonitorSmartphone
} from 'lucide-react';
import './Industries.css';

const industriesData = [
  { icon: <HeartPulse size={28} />, name: 'Healthcare' },
  { icon: <Landmark size={28} />, name: 'Finance' },
  { icon: <ShoppingCart size={28} />, name: 'Retail' },
  { icon: <Car size={28} />, name: 'Automotive' },
  { icon: <Sprout size={28} />, name: 'Agriculture' },
  { icon: <Factory size={28} />, name: 'Manufacturing' },
  { icon: <Building size={28} />, name: 'Government' },
  { icon: <GraduationCap size={28} />, name: 'Education' },
  { icon: <Truck size={28} />, name: 'Logistics' },
  { icon: <MonitorSmartphone size={28} />, name: 'Technology' },
];

const Industries = () => {
  return (
    <div className="container section">
      <div className="section-header">
        <h2 className="section-title">Industries We Serve</h2>
        <p className="section-subtitle">
          Powering AI transformation across diverse sectors with high-quality domain-specific data solutions.
        </p>
      </div>

      <div className="industries-grid">
        {industriesData.map((ind, index) => (
          <div className="industry-card" key={index}>
            <div className="industry-icon">{ind.icon}</div>
            <p className="industry-name">{ind.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Industries;
