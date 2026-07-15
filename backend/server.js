import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const MESSAGES_FILE = process.env.VERCEL ? '/tmp/messages.json' : path.join(__dirname, 'messages.json');

// Ensure messages file exists
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
}

app.post('/api/contact', (req, res) => {
  const { fullName, emailAddress, companyName, serviceInterest, message } = req.body;

  if (!fullName || !emailAddress || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newMessage = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    fullName,
    emailAddress,
    companyName,
    serviceInterest,
    message,
  };

  try {
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(data);
    messages.push(newMessage);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
    
    console.log('New message received from:', fullName);
    res.status(201).json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// AI-Powered Chatbot Logic
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const systemPrompt = `You are the EpochTrace Assistant, a friendly, conversational customer support AI for EpochTrace.
About EpochTrace: We are an AI data services and language technology company. We build high-quality training datasets, multilingual solutions, and intelligent data operations for global organizations by combining human expertise with AI.
Services: AI Data Annotation, NLP Services, Audio Services, Computer Vision, Translation & Localization, AI Consulting, SaaS & Software, and BPO & KPO.
Industries: Healthcare, Finance, Retail, Automotive, Agriculture, Manufacturing, Government, Education, Logistics, and Technology.
Process (7 steps): 1) Consultation, 2) Requirement Analysis, 3) Data Collection, 4) Annotation by experts, 5) Quality Assurance, 6) Making it AI Model Ready, 7) Secure Delivery.
Contact: email info@epochtrace.com, phone +91 98765 43210, office 123 AI Park, Innovation Street, Bangalore, India - 560001.
Pricing: Highly customizable based on project scope. Customers should contact us for a custom quote.

IMPORTANT RULES FOR YOUR REPLIES:
1. BE CONVERSATIONAL & NATURAL: Talk like a human assistant, not a robotic brochure.
2. BE BRIEF: Keep answers short (1-3 sentences if possible). Do NOT dump all the services or industries at once unless specifically asked to list them all.
3. NO BULKY LISTS: Avoid using bullet points unless strictly necessary.
4. If a user asks what we do, give a very brief 1-sentence summary and politely ask what specific area they are interested in.
5. If the user asks something completely unrelated, politely steer the conversation back to our offerings.`;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ reply: "I'm sorry, my AI brain is not fully configured right now (missing API key). Please try again later or use the Contact form!" });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt 
    });
    
    const result = await model.generateContent(message);
    const reply = result.response.text();
    
    res.status(200).json({ reply });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ reply: "I'm sorry, I'm having trouble connecting to my AI brain right now. Please try again later or use the Contact form!" });
  }
});

// Only start the server locally if not on Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

export default app;
