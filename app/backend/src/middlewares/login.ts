import { Request, Response, NextFunction } from 'express';
import { BadRequest, Unauthorized } from '../commons/errors';

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

export default {
  validateLogin,
};
