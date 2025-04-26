import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { logger } from './logger.js';

dotenv.config();

// PostgreSQL connection using Sequelize
export const sequelize = new Sequelize(
  process.env.PGDATABASE || 'neondb',
  process.env.PGUSER || 'neondb_owner',
  process.env.PGPASSWORD || 'npg_sbIvu8fC9MhX',
  {
    host: process.env.PGHOST || 'ep-dark-wind-a18f7dmt-pooler.ap-southeast-1.aws.neon.tech',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

/**
 * Connect to PostgreSQL database
 */
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info('PostgreSQL Database connected successfully');
  } catch (error) {
    logger.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Synchronize database models with database schema
 * @param {Object} options - Sequelize sync options
 * @param {boolean} options.force - Drop tables before creating new ones
 * @param {boolean} options.alter - Alter existing tables to match models
 */
export const syncDB = async (options = { alter: true }) => {
  try {
    logger.info('Starting database synchronization...');
    await sequelize.sync(options);
    logger.info('Database models synchronized successfully');
  } catch (error) {
    logger.error(`Database synchronization error: ${error.message}`);
    process.exit(1);
  }
};