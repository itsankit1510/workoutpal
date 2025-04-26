import { StatusCodes } from 'http-status-codes';
import { User } from '../models/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { logger } from '../config/logger.js';

/**
 * Controller for user management operations
 */
export const userController = {
  /**
   * Create a new user (admin only)
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   */
  async createUser(req, res, next) {
    try {
      const { firstName, lastName, email, password, role = 'user' } = req.body;

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
        role
      });

      // Return created user
      return ApiResponse.success(
        res,
        'User created successfully',
        { user },
        StatusCodes.CREATED
      );
    } catch (error) {
      logger.error('User creation error:', error);
      next(error);
    }
  },

  /**
   * Get all users (admin only)
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   */
  async getAllUsers(req, res, next) {
    try {
      const users = await User.findAll();
      return ApiResponse.success(res, 'Users retrieved successfully', { users });
    } catch (error) {
      logger.error('Get users error:', error);
      next(error);
    }
  },

  /**
   * Get user by ID
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   */
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return ApiResponse.error(res, 'User not found', StatusCodes.NOT_FOUND);
      }

      return ApiResponse.success(res, 'User retrieved successfully', { user });
    } catch (error) {
      logger.error('Get user error:', error);
      next(error);
    }
  },
  
  /**
   * Delete a user by ID (admin only)
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   */
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      // Don't allow admins to delete themselves
      if (id === req.user.id) {
        return ApiResponse.error(
          res,
          'Cannot delete your own account',
          StatusCodes.FORBIDDEN
        );
      }

      const user = await User.findByPk(id);

      if (!user) {
        return ApiResponse.error(res, 'User not found', StatusCodes.NOT_FOUND);
      }

      await user.destroy();
      return ApiResponse.success(res, 'User deleted successfully');
    } catch (error) {
      logger.error('Delete user error:', error);
      next(error);
    }
  }
};