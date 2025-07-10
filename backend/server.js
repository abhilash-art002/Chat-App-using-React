import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import multer from 'multer';
// import path from 'path';
import db from './db.js';

const app = express();

// ✅ Correct CORS setup
app.use(cors({
  origin: 'http://localhost:5173', // your React frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send("Backend working!");
});

// app.use('/api/user', userRoutes);
app.use('/uploads', express.static('uploads'));


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});


// Storage config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Endpoint for message with image
app.post('/api/messages/send', upload.single('image'), (req, res) => {
  const { sender_id, receiver_id, content } = req.body;
  const image_url = req.file ? req.file.filename : null;

  const query = 'INSERT INTO messages (sender_id, receiver_id, message, image_url) VALUES (?, ?, ?, ?)';
  db.query(query, [sender_id, receiver_id, content || null, image_url], (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ message: 'Error sending message' });
    }
    res.status(200).json({ message: 'Message sent', messageId: result.insertId });
  });
});

// Serve image statically
app.use('/uploads', express.static('uploads'));
