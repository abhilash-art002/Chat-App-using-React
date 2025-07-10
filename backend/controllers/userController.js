import db from '../db.js';
import multer from 'multer';


// Set up multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}_${file.originalname}`)
});
export const upload = multer({ storage }); 


// API: Update profile image
export const updateProfile = (req, res) => {
  const { userId, username, bio } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  let query = 'UPDATE users SET username = ?, bio = ?';
  let params = [username, bio];

  if (profileImage) {
    query += ', profile_image = ?';
    params.push(profileImage);
  }

  query += ' WHERE id = ?';
  params.push(userId);

  db.query(query, params, (err) => {
    if (err) {
      console.error("Profile update error:", err);
      return res.status(500).json({ message: "Failed to update profile" });
    }

    res.status(200).json({ message: "Profile updated", imageUrl: profileImage });
  });
};

export const getAllUsers = (req, res) => {
  db.query('SELECT id, username, profile_image FROM users', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching users' });
    res.json(results);
  });
};
