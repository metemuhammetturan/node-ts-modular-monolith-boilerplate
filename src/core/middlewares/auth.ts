import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getError } from '../constants/errorCodes.ts';
import logger from '../utils/log-management/logger.ts';                            
import config from '../../config/env.ts';

interface JwtPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles?: string[];
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = getError('AUTH_TOKEN_MISSING');
      logger.warn('Authentication failed: Missing token', { ip: req.ip });
      return res.status(error.statusCode).json({
        success: false,
        error: {
          statusCode: error.statusCode,
          message: error.message,
          code: error.code,
        },
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      req.user = {
        id: decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        roles: decoded.roles || [],
      };
      return next();
    } catch (jwtError: any) {
      const error = getError('AUTH_TOKEN_INVALID');
      return res.status(error.statusCode).json({
        success: false,
        error: {
          statusCode: error.statusCode,
          message: error.message,
          code: error.code,
        },
      });
    }
  } catch (error: any) {
    logger.error('Auth middleware fatal error', { error: error.message });
    const appError = getError('AUTH_UNAUTHORIZED');
    return res.status(appError.statusCode).json({
      success: false,
      error: { statusCode: appError.statusCode, message: appError.message, code: appError.code },
    });
  }
};

export default authMiddleware;