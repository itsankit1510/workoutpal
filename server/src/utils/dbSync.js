// filepath: c:\Users\Ankit.Bisht\Desktop\Ankitsingh Bisht\docubot\server\src\utils\dbSync.js
import { syncDB } from '../config/database.js';
import { logger } from '../config/logger.js';

/**
 * Script to synchronize database models with database schema
 */
async function syncDatabase() {
  try {
    logger.info('Starting database synchronization...');
    
    // Alter existing tables to match models
    await syncDB({ alter: true });
    
    logger.info('Database synchronization completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error(`Database synchronization error: ${error.message}`);
    process.exit(1);
  }
}

// Execute the sync
syncDatabase();