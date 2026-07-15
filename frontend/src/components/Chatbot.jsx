import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi there! 👋 I am the EpochTrace assistant. Ask me anything about our company, services, or how to contact us!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Focus the input field when chat opens
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // In production (Vercel), just use the relative /api/chat route since rewrites handle it. 
      // Locally, point to the local server.
      const isProduction = import.meta.env.PROD || window.location.hostname.includes('vercel');
      const apiUrl = isProduction ? '' : 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
      } else {
        try {
          const errorData = await response.json();
          setMessages(prev => [...prev, { role: 'bot', text: errorData.reply || `Error ${response.status}: Unable to connect.` }]);
        } catch (e) {
          setMessages(prev => [...prev, { role: 'bot', text: `Sorry, I'm having trouble connecting right now (HTTP ${response.status}).` }]);
        }
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Network error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <Bot size={20} className="bot-icon" />
            <div>
              <h4>EpochTrace Assistant</h4>
              <span className="online-status">Online</span>
            </div>
          </div>
          <button onClick={toggleChat} className="close-btn" aria-label="Close Chat">
            <X size={20} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-wrapper ${msg.role}`}>
              <div className="message-bubble">
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message-wrapper bot">
              <div className="message-bubble typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chatbot-input-form">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={!input.trim() || isLoading} aria-label="Send">
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Floating Action Button */}
      <button 
        className={`chatbot-fab ${isOpen ? 'hidden' : ''}`} 
        onClick={toggleChat}
        aria-label="Open Chat"
      >
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default Chatbot;
