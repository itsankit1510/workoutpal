// filepath: c:\Users\Ankit.Bisht\Desktop\Ankitsingh Bisht\docubot\server\src\utils\seedAdmin.js
import dotenv from 'dotenv';
import { User } from '../models/index.js';
import { connectDB } from '../config/database.js';
import { logger } from '../config/logger.js';

dotenv.config();

/**
 * Seeds an initial admin user if no admin user exists
 */
const seedAdminUser = async () => {
  try {
    // Connect to database
    await connectDB();
    
    logger.info('Checking for existing admin users...');
    
    // Check if admin user already exists
    const adminExists = await User.findOne({ where: { role: 'admin' } });
    
    if (adminExists) {
      logger.info('Admin user already exists. Skipping seed.');
      process.exit(0);
    }
    
    // Admin credentials from environment or defaults
    const adminUser = {
      firstName: process.env.SEED_ADMIN_FIRST_NAME || 'Admin',
      lastName: process.env.SEED_ADMIN_LAST_NAME || 'User',
      email: process.env.SEED_ADMIN_EMAIL || 'admin@example.com',
      password: process.env.SEED_ADMIN_PASSWORD || 'Admin@123',
      role: 'admin'
    };
    
    // Create admin user
    await User.create(adminUser);
    
    logger.info(`Admin user created successfully with email: ${adminUser.email}`);
    logger.info('Please change the default password immediately after first login!');
    
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

// Execute seeding
seedAdminUser();