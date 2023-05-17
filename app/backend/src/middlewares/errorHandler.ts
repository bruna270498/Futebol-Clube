import { Request, Response, NextFunction } from 'express';
import { IError } from '../commons/errors';
import { statusCodes } from '../commons/enums';

const errorHandler = (err: IError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || statusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ message: err.message });
};

export default errorHandler;
