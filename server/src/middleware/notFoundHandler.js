import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../utils/apiResponse.js';

/**
 * Handler for routes that don't exist
 */
export const notFoundHandler = (req, res) => {
  return ApiResponse.error(
    res,
    `Resource not found - ${req.originalUrl}`,
    StatusCodes.NOT_FOUND
  );
};