/**
 * Main server file for the Sailing Races API
 * Sets up Express server, middleware, routes, and database connection
 */

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import raceRoutes from './routes/raceRoutes.js';
import forecastRouter from './routes/forecast.js';
import tipRoute from './routes/tip.js';
import termsRoute from './routes/terms.js';


// ES Modules compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();

/**
 * Middleware Configuration
 * - CORS: Enables Cross-Origin Resource Sharing
 * - JSON: Parses incoming JSON payloads
 */
app.use(cors());
app.use(express.json());
app.use('/api', forecastRouter);
app.use('/api', tipRoute);
app.use('/api', termsRoute);

/**
 * Root Route
 * Provides basic API information
 */
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Sailing Races API',
    version: '1.0.0',
    endpoints: {
      races: '/api/races',
      singleRace: '/api/races/:id'
    },
    methods: {
      GET: 'Retrieve races',
      POST: 'Create a new race',
      PUT: 'Update a race',
      DELETE: 'Delete a race'
    }
  });
});

/**
 * API Routes
 * All race-related endpoints are prefixed with /api/races
 */
app.use('/api/races', raceRoutes);

/**
 * MongoDB Connection
 * Connects to MongoDB using the URI from environment variables
 * Falls back to localhost if no URI is provided
 */
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sailing-races')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

/**
 * Global Error Handler
 * Catches any unhandled errors in the application
 * Returns a 500 status code with a generic error message
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 