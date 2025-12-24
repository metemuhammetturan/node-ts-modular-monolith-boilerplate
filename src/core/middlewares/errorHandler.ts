import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError.ts';
import logger from '../utils/log-management/logger.ts';
import { getError } from '../constants/errorCodes';
import config from '../../config/env.ts';

const handleCastErrorDB = () => {
  const error = getError('DB_CAST_ERROR');
  return new AppError(error.statusCode, error.message, true, error.code);
};

const handleDuplicateFieldsDB = () => {
  const error = getError('DB_DUPLICATE_KEY');
  return new AppError(error.statusCode, error.message, true, error.code);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const error = getError('DB_VALIDATION_ERROR');
  const message = `${error.message} ${errors.join('. ')}`;
  return new AppError(error.statusCode, message, true, error.code);
};

export default (err: any, req: Request, res: Response, _next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.env === 'development') {
    res.status(err.statusCode).json({
      success: false,
      error: {
        status: err.status,
        statusCode: err.statusCode,
        message: err.message,
        code: err.errorCode,
        stack: err.stack,
      },
    });
  } else {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB();
    if (err.code === 11000) error = handleDuplicateFieldsDB();
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);

    if (error.isOperational) {
      res.status(error.statusCode).json({
        success: false,
        error: {
          statusCode: error.statusCode,
          message: error.message,
          code: error.errorCode,
        },
      });
    } else {
      logger.error('NON-OPERATIONAL ERROR 💥', err);
      const internalErr = getError('INTERNAL_SERVER_ERROR');
      res.status(500).json({
        success: false,
        error: { statusCode: 500, message: internalErr.message, code: internalErr.code },
      });
    }
  }
};