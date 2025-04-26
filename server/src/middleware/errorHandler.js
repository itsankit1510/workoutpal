import { StatusCodes } from 'http-status-codes';
import { logger } from '../config/logger.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ValidationError } from 'sequelize';

/**
 * Global error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  // Default error status code and message
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Log detailed error information
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, {
    stack: err.stack,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Handle specific error types
  if (err instanceof ValidationError) {
    // Sequelize validation errors
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Validation error';
    errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
  } else if (err.name === 'JsonWebTokenError') {
    // JWT errors
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    // JWT expiration
    statusCode = StatusCodes.UNAUTHORIZED;
    message = 'Token expired';
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    // Unique constraint errors
    statusCode = StatusCodes.CONFLICT;
    message = 'Unique constraint violation';
    errors = Object.keys(err.fields).map(field => ({
      field,
      message: `${field} already exists`
    }));
  } else if (err.name === 'SequelizeDatabaseError') {
    // Database errors
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Database error';
  }

  // Return standardized error response
  return ApiResponse.error(res, message, statusCode, errors);
};