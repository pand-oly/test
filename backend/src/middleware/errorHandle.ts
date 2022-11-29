import { ErrorRequestHandler } from 'express';
import { errorCatalog, ErrorTypes } from '../errors/catalogErrors';

const errorHandler: ErrorRequestHandler = (err: Error, _req, res, _next) => {
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[messageAsErrorType];

  if (mappedError) {
    const { httpStatus, error } = mappedError;
    return res.status(httpStatus).json({ error });
  }

  console.log(err);
  return res.status(500).json({ message: 'internal error' });
};

export default errorHandler;
