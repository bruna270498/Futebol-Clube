import { Request, Response, NextFunction } from 'express';
import { BadRequest, Unauthorized } from '../commons/errors';
import { verifyToken } from '../commons/jwt';

const inputInvalid = 'Invalid email or password';

const validateEmail = (email: string) => {
  const regex = /^(?!.*\.\.)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const validatePassword = (password: string) => {
  if (password.length < 6) return false;
  return true;
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequest('All fields must be filled');
  if (!validateEmail(email)) throw new Unauthorized(inputInvalid);
  if (!validatePassword(password)) throw new Unauthorized(inputInvalid);
  next();
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) throw new Unauthorized('Token not found');
  try {
    verifyToken(token);
  } catch (e) {
    throw new Unauthorized('Token must be a valid token');
  }
  next();
};

export default {
  validateLogin,
  validateToken,
};
