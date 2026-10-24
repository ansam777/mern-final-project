import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import seriesRoutes from './routes/seriesRoutes.js';
import episodeRoutes from './routes/episodeRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/episodes', episodeRoutes);

// Centralized Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));