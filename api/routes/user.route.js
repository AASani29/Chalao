import express from 'express';
import {
  test,
  updateUser,
  deleteUser,
  getAllUsers,
  
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js'; // Middleware for verifying token
import { verifyAdmin } from '../utils/verifyAdmin.js';

const router = express.Router();

// Test Route
router.get('/', test);

router.get('/admin/dashboard', verifyToken, verifyAdmin, (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard!' });
});


// Update User Route
router.post('/update/:id', verifyToken, async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    // Ensure req.user is set by verifyToken middleware
    if (!req.user || req.user.id !== req.params.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: You can only update your own account!" });
    }

    // Proceed to update user via the controller
    await updateUser(req, res, next);
  } catch (err) {
    console.error("Error in update route:", err);
    next(err); // Pass error to middleware
  }
});

// Delete User Route
router.delete('/delete/:id', verifyToken, verifyAdmin,  async (req, res, next) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

  
    // Proceed to delete user via the controller
    await deleteUser(req, res, next);
  } catch (err) {
    console.error("Error in delete route:", err);
    next(err); // Pass error to middleware
  }
});

// Get all users
router.get('/admin/users', verifyToken, verifyAdmin, getAllUsers);


export default router;
