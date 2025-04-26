import express from 'express';
import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { authenticateJWT, authenticateLocal } from '../middleware/authHandler.js';

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', authController.register);

/**
 * @route POST /api/auth/login
 * @desc Login with email and password
 * @access Public
 */
router.post('/login', authenticateLocal, authController.login);

/**
 * @route POST /api/auth/logout
 * @desc Logout a user
 * @access Protected
 */
router.post('/logout', authenticateJWT, authController.logout);

/**
 * @route GET /api/auth/profile
 * @desc Get user profile
 * @access Protected
 */
router.get('/profile', authenticateJWT, authController.getProfile);

export default router;