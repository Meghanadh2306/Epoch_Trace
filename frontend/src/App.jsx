import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Industries from './components/Industries';
import Process from './components/Process';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="industries">
        <Industries />
      </div>
      <div id="process">
        <Process />
      </div>
      <div id="contact">
        <Contact />
      </div>
      
      {/* Global AI Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
