import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const MESSAGES_FILE = path.join(__dirname, 'messages.json');

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

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
