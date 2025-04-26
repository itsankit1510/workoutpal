import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/index.js';
import { verifyToken } from '../utils/tokenUtils.js';
import { ApiResponse } from '../utils/apiResponse.js';

// JWT configuration options
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_ACCESS_SECRET || 'access-secret-key-change-in-production',
  passReqToCallback: true
};

// Local strategy for username/password authentication
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ where: { email, isActive: true } });

        // User not found or password invalid
        if (!user || !(await user.validatePassword(password))) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // Authentication successful
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT strategy for token authentication
passport.use(
  new JwtStrategy(jwtOptions, async (req, jwtPayload, done) => {
    try {
      // Get token from authorization header
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return done(null, false);
      }

      // Verify token in database
      const decodedToken = await verifyToken(token);

      if (!decodedToken) {
        return done(null, false);
      }

      // Get user from database
      const user = await User.findOne({
        where: {
          id: jwtPayload.sub,
          isActive: true
        }
      });

      if (!user) {
        return done(null, false);
      }

      // Authentication successful
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

/**
 * Middleware to authenticate user with JWT
 */
export const authenticateJWT = passport.authenticate('jwt', { session: false });

/**
 * Middleware to authenticate with username and password
 */
export const authenticateLocal = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return ApiResponse.error(res, info?.message || 'Authentication failed', StatusCodes.UNAUTHORIZED);
    }
    req.user = user;
    next();
  })(req, res, next);
};

/**
 * Middleware to check if user has admin role
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return ApiResponse.error(res, 'Access denied: Admin privileges required', StatusCodes.FORBIDDEN);
  }
  next();
};