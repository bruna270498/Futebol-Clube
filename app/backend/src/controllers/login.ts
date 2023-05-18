import { Request, Response } from 'express';
import { loginService } from '../services';
import { generateToken } from '../commons/jwt';
import { statusCodes } from '../commons/enums';
import { Unauthorized } from '../commons/errors';

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await loginService.login(email, password);
  const token = generateToken({ id: user.id });
  res.status(statusCodes.OK).json({ token });
};

const getUserRoleByToken = async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization;
  if (!token) throw new Unauthorized('Token not found');
  const role = await loginService.getUserRoleByToken(token);
  res.status(statusCodes.OK).json({ role });
};

export default {
  login,
  getUserRoleByToken,
};
