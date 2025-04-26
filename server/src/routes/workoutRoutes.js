import { Router } from 'express';
import { authenticateJWT } from '../middleware/authHandler.js';

const router = Router();

/**
 * @route GET /api/workouts
 * @desc Get all workouts for the authenticated user
 * @access Protected
 */
router.get('/', authenticateJWT, (req, res) => {
  res.status(200).json({ message: 'Workout listing endpoint - coming soon' });
});

/**
 * @route POST /api/workouts
 * @desc Create a new workout
 * @access Protected
 */
router.post('/', authenticateJWT, (req, res) => {
  res.status(201).json({ message: 'Workout creation endpoint - coming soon' });
});

export default router;