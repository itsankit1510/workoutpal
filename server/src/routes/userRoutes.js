import { Router } from 'express';
import { authenticateJWT, requireAdmin } from '../middleware/authHandler.js';
import { userController } from '../controllers/userController.js';

const router = Router();

/**
 * @route GET /api/users
 * @desc Get all users (admin only)
 * @access Admin
 */
router.get('/', authenticateJWT, requireAdmin, userController.getAllUsers);

/**
 * @route POST /api/users
 * @desc Create a new user (admin only)
 * @access Admin
 */
router.post('/', authenticateJWT, requireAdmin, userController.createUser);

/**
 * @route GET /api/users/:id
 * @desc Get user by ID
 * @access Protected
 */
router.get('/:id', authenticateJWT, userController.getUserById);

export default router;