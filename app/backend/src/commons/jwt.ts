import { sign, verify, SignOptions } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'secret';

export const generateToken = (payload: object) =>
  sign(payload, secretKey, { expiresIn: '1d' } as SignOptions);

export const verifyToken = (token: string) => verify(token, secretKey);

export default {
  generateToken,
  verifyToken,
};
