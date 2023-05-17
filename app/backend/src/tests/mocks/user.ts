import { hashSync } from 'bcryptjs';

export const user = {
  id: 1,
  username: 'Bruna Freitas',
  role: 'admin',
  email: 'bruna@trybe.com',
  password: hashSync('123456', 10),
};

export default user;