import rateLimit, { Options } from 'express-rate-limit';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { getError } from '../constants/errorCodes';
import config from '../../config/env.ts';

const isDevelopment = config.env === 'development';
const noOpLimiter: RequestHandler = (req: Request, res: Response, next: NextFunction) => next();

const createLimiterConfig = (max: number): Partial<Options> => ({
  windowMs: 15 * 60 * 1000,
  max,
  message: (req: Request, res: Response) => {
    const error = getError('RATE_LIMIT_EXCEEDED');
    return res.status(error.statusCode).json({
      success: false,
      error: {
        statusCode: error.statusCode,
        message: error.message,
        code: error.code,
      },
    });
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = isDevelopment ? noOpLimiter : rateLimit(createLimiterConfig(5) as Options);
export const apiLimiter = isDevelopment ? noOpLimiter : rateLimit(createLimiterConfig(100) as Options);