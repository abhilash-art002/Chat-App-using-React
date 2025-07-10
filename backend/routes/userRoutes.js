// routes/userRoutes.js

import express from 'express';
import { getAllUsers, updateProfile, upload } from '../controllers/userController.js';

const router = express.Router();

// ✅ Correct order
router.post('/update-profile', upload.single('profile_image'), updateProfile);
router.get('/', getAllUsers);

export default router;
