import express from 'express';
import { getAllSeries, getMySeries, createSeries, getSeriesById } from '../controllers/seriesController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllSeries);
router.get('/my', authenticateToken, getMySeries);
router.post('/', authenticateToken, createSeries);
router.get('/:id', getSeriesById);

export default router;