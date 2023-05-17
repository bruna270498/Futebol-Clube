import { Request, Response } from 'express';
import { loginService } from '../services';
import { generateToken } from '../commons/jwt';
import { statusCodes } from '../commons/enums';

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await loginService.login(email, password);
  const token = generateToken({ id: user.id });
  res.status(statusCodes.OK).json({ token });
};

export default {
  login,
};
