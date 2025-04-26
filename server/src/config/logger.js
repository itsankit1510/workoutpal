import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(info => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: ${message}${
      Object.keys(meta).length ? '\n' + JSON.stringify(meta, null, 2) : ''
    }`;
  })
);

// Create console format with colors
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(info => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: ${message}${
      Object.keys(meta).length ? '\n' + JSON.stringify(meta, null, 2) : ''
    }`;
  })
);

// Create file transports
const fileTransport = new winston.transports.DailyRotateFile({
  filename: path.join(__dirname, '../../logs/%DATE%-app.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  format: logFormat
});

const errorFileTransport = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: path.join(__dirname, '../../logs/%DATE%-error.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  format: logFormat
});

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'workoutpal-api' },
  transports: [
    // Console transport (development only)
    new winston.transports.Console({
      format: consoleFormat,
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
    }),
    // File transports
    fileTransport,
    errorFileTransport
  ]
});