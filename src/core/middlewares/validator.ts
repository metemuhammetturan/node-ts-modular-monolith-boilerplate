import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';
import { getError } from '../constants/errorCodes';

/**
 * Request validation middleware
 * @param schema - Joi validation schema
 * @param source - 'body' | 'query' | 'params' (default: 'body')
 */
export const validate = (
  schema: Joi.Schema, 
  source: 'body' | 'query' | 'params' = 'body'
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      const validationError = getError('VALIDATION_ERROR');
      
      return res.status(validationError.statusCode).json({
        success: false,
        error: {
          statusCode: validationError.statusCode,
          message: validationError.message,
          code: validationError.code,
          details: errors,
        },
      });
    }

    (req as any)[source] = value;
    return next();
  };
};