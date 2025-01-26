import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import User from './models/user.model.js';

import bcryptjs from 'bcryptjs';
import cors from 'cors'; 
import licenseRoutes from './routes/license.route.js';

// Load environment variables
dotenv.config();

// Ensure MONGO environment variable is set
if (!process.env.MONGO) {
  console.error('Error: MONGO environment variable is not defined.');
  process.exit(1);
}

const app = express();
const __dirname = path.resolve();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    createAdminUser();
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // Exit if the database connection fails
  });

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/licenses', licenseRoutes);


// Catch-all route for serving the client
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`Error: ${message} (Status: ${statusCode})`);
  res.status(statusCode).json({
    success: false,
    message,
  });
});

const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@admin.com', role: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = bcryptjs.hashSync('admin', 10);
      const adminUser = new User({
        username: 'admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        role: 'admin',
      });
      await adminUser.save();
      console.log('Admin user created successfully!');
    } else {
      console.log('Admin user already exists.');
    }
  } catch (err) {
    console.error('Error creating admin user:', err);
  }
};

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



