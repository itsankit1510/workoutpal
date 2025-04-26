import { StatusCodes } from 'http-status-codes';
import { User } from '../models/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { generateTokens, blacklistToken } from '../utils/tokenUtils.js';
import { logger } from '../config/logger.js';

/**
 * Controller for user authentication operations
 */
export const authController = {
  /**
   * Register a new user
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   */
  async register(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Check if email is already in use
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return ApiResponse.error(
          res,
          'Email is already in use',
          StatusCodes.CONFLICT
        );
      }

      // Create new user
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });

      // Generate token
      const userAgent = req.headers['user-agent'];
      const ipAddress = req.ip;
      const tokens = await generateTokens(user, userAgent, ipAddress);

      // Update last login timestamp
      await user.update({ lastLogin: new Date() });

      // Return user and token
      return ApiResponse.success(
        res, 
        'User registered successfully', 
        {
          user,
          tokens: {
            accessToken: tokens.accessToken,
            accessExpires: tokens.accessExpires,
          }
        },
        StatusCodes.CREATED
      );
    } catch (error) {
      logger.error('Registration error:', error);
      next(error);
    }
  },

  /**
   * Login an existing user
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   */
  async login(req, res, next) {
    try {
      // User is already authenticated by the authenticateLocal middleware
      const user = req.user;

      // Generate token
      const userAgent = req.headers['user-agent'];
      const ipAddress = req.ip;
      const tokens = await generateTokens(user, userAgent, ipAddress);

      // Update last login timestamp
      await user.update({ lastLogin: new Date() });

      // Return user and token
      return ApiResponse.success(
        res,
        'Login successful',
        {
          user,
          tokens: {
            accessToken: tokens.accessToken,
            accessExpires: tokens.accessExpires,
          }
        }
      );
    } catch (error) {
      logger.error('Login error:', error);
      next(error);
    }
  },

  /**
   * Logout a user by blacklisting their token
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   */
  async logout(req, res, next) {
    try {
      // Get token from authorization header
      const token = req.headers.authorization?.split(' ')[1];

      if (token) {
        // Blacklist the token
        await blacklistToken(token);
      }

      return ApiResponse.success(res, 'Logged out successfully');
    } catch (error) {
      logger.error('Logout error:', error);
      next(error);
    }
  },

  /**
   * Get current authenticated user profile
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   */
  async getProfile(req, res, next) {
    try {
      const user = req.user;
      return ApiResponse.success(res, 'Profile retrieved successfully', { user });
    } catch (error) {
      logger.error('Get profile error:', error);
      next(error);
    }
  }
};