// controllers/messageController.js
import db from '../db.js';

export const sendMessage = (req, res) => {
  const { sender_id, receiver_id, content } = req.body;
  // const query = 'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)';
  const query = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';

  db.query(query, [sender_id, receiver_id, content], (err, result) => {
    if (err){
      console.error("SQL Error:", err);
      return res.status(500).json({ message: 'Error sending message' });
    }
    res.status(200).json({ message: 'Message sent', userId: result.insertId });
  });
};

export const getMessages = (req, res) => {
  const { userId, friendId } = req.params;
//   const query = `
//   SELECT * FROM messages 
//   WHERE (sender_id = ? AND receiver_id = ?) 
//      OR (sender_id = ? AND receiver_id = ?)
//   ORDER BY created_at ASC
// `;

 const query = `
  SELECT m.*, u.username, u.profile_image 
  FROM messages m
  JOIN users u ON m.sender_id = u.id
  WHERE (m.sender_id = ? AND m.receiver_id = ?) 
     OR (m.sender_id = ? AND m.receiver_id = ?)
  ORDER BY m.created_at ASC
`;

  db.query(query, [userId, friendId, friendId, userId], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({ message: 'Error fetching messages' });
    }
    res.status(200).json(results);
  });
};
