import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = ['home', 'about', 'services', 'industries', 'process', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false); 
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" className="logo" onClick={(e) => scrollToSection(e, 'home')}>
          <div className="logo-icon"></div>
          Epoch<span>Trace</span>
        </a>
        
        <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'home')}>Home</a>
          </li>
          <li>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'about')}>About Us</a>
          </li>
          <li>
            <a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'services')}>Services</a>
          </li>
          <li>
            <a href="#industries" className={activeSection === 'industries' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'industries')}>Industries</a>
          </li>
          <li>
            <a href="#process" className={activeSection === 'process' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'process')}>Process</a>
          </li>
          <li className="nav-cta-item">
            <a href="#contact" className="btn btn-primary nav-cta" onClick={(e) => scrollToSection(e, 'contact')}>Contact Us</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
