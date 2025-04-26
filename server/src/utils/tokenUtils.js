import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
import { Token } from '../models/index.js';

dotenv.config();

// JWT Secret Key - in production, use strong, unique secret stored in environment variables
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access-secret-key-change-in-production';

// Token expiration time
const ACCESS_TOKEN_EXPIRES = '1d';   // 1 day

/**
 * Generate JWT token for authentication
 * @param {object} user - User object to generate token for
 * @param {string} userAgent - Client user agent
 * @param {string} ipAddress - Client IP address
 * @returns {object} - Object containing access token
 */
export const generateTokens = async (user, userAgent = null, ipAddress = null) => {
  // Generate JWT payload
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role
  };

  // Generate access token
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
  
  // Calculate expiry date for database
  const accessExpires = new Date();
  accessExpires.setDate(accessExpires.getDate() + 1); // 1 day from now

  // Store token in database
  await Token.create({
    userId: user.id,
    token: accessToken,
    type: 'access',
    expires: accessExpires,
    userAgent,
    ipAddress
  });

  return {
    accessToken,
    accessExpires
  };
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {object|null} - Decoded token payload or null if invalid
 */
export const verifyToken = async (token) => {
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    
    // Check if token exists in database and is not blacklisted
    const tokenDoc = await Token.findOne({ 
      where: { 
        token,
        type: 'access',
        blacklisted: false
      }
    });

    if (!tokenDoc) {
      return null;
    }

    // Check if token is expired
    if (new Date() > new Date(tokenDoc.expires)) {
      return null;
    }

    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Blacklist a token
 * @param {string} token - Token to blacklist 
 */
export const blacklistToken = async (token) => {
  await Token.update(
    { blacklisted: true },
    { where: { token } }
  );
};

/**
 * Remove expired tokens from database
 */
export const removeExpiredTokens = async () => {
  await Token.destroy({
    where: {
      expires: { 
        [Op.lt]: new Date() 
      }
    }
  });
};