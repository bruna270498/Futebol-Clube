import { compareSync } from 'bcryptjs';
import User from '../database/models/User';
import { Unauthorized } from '../commons/errors';

const messageUnauthorized = 'Invalid email or password';

const login = async (email: string, password: string): Promise<User> => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Unauthorized(messageUnauthorized);
  const hash = user?.password;
  const isValidPassword = compareSync(password, hash || '');
  if (!isValidPassword) throw new Unauthorized(messageUnauthorized);
  return user;
};

export default {
  login,
};
