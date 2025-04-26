import { StatusCodes } from 'http-status-codes';

/**
 * Utility class for standardized API responses
 */
export class ApiResponse {
  /**
   * Send a success response
   * @param {object} res - Express response object
   * @param {string} message - Success message
   * @param {object} [data=null] - Response data
   * @param {number} [statusCode=200] - HTTP status code
   * @returns {object} - Express response
   */
  static success(res, message, data = null, statusCode = StatusCodes.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Send an error response
   * @param {object} res - Express response object
   * @param {string} message - Error message
   * @param {number} [statusCode=500] - HTTP status code
   * @param {object} [errors=null] - Validation errors or additional error info
   * @returns {object} - Express response
   */
  static error(res, message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Send a paginated response
   * @param {object} res - Express response object
   * @param {string} message - Success message
   * @param {object} data - Response data
   * @param {object} pagination - Pagination details
   * @param {number} [statusCode=200] - HTTP status code
   * @returns {object} - Express response
   */
  static paginated(res, message, data, pagination, statusCode = StatusCodes.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      pagination,
      timestamp: new Date().toISOString()
    });
  }
}