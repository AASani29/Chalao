import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

// Update user
export const updateUser = async (req, res, next) => {
  // Check if the authenticated user matches the user being updated
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    // If the password is being updated, hash it
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Update the user in the database, including the coverPicture field
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
          
        },
      },
      { new: true } // Return the updated document
    );

    // Exclude the password from the response
    const { password, ...rest } = updatedUser._doc;

    // Send the updated user data as the response
    res.status(200).json(rest);
  } catch (error) {
    // Pass any errors to the error handler middleware
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // Allow admins to delete any user
    if (req.user.role === 'admin') {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return next(errorHandler(404, 'User not found!'));
      }
      return res.status(200).json({ message: 'User has been deleted by admin.' });
    }

    // Allow users to delete only their own account
    if (req.user.id !== req.params.id) {
      return next(errorHandler(401, 'You can delete only your own account!'));
    }

    // Proceed with deletion for the user
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) {
      return next(errorHandler(404, 'User not found!'));
    }
    return res.status(200).json({ message: 'Your account has been deleted.' });
  } catch (error) {
    next(error); // Pass any errors to the middleware
  }
};




// Fetch all users (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

