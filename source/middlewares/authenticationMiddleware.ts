import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ObjectSchema } from 'joi';

export function validateBody(schema: ObjectSchema, req: Request, res: Response, next: NextFunction) {
  if (!req.body) {
    return res.status(httpStatus.BAD_REQUEST);
  }
  const { error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (!error) {
    next();
  } else {
    return res.status(httpStatus.BAD_REQUEST).send(error.details);
  }
}

export function validateParams(schema: ObjectSchema, req: Request, res: Response, next: NextFunction) {
  if (!req.params) {
    return res.status(httpStatus.BAD_REQUEST);
  }
  const { error } = schema.validate(req.params, {
    abortEarly: false,
  });
  if (!error) {
    next();
  } else {
    return res.status(httpStatus.BAD_REQUEST).send(error.details);
  }
}
