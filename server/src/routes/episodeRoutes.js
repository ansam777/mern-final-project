import express from 'express';
import { createEpisode, getEpisodeById } from '../controllers/episodeController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createEpisode);
router.get('/:id', getEpisodeById);

export default router;