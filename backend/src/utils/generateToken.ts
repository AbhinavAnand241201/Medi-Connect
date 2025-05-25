import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
}

export const generateToken = (id: string): string => {
  const payload: TokenPayload = { id };
  const secret = process.env.JWT_SECRET || 'fallback_secret_key';
  const options: jwt.SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']) || '7d',
  };

  return jwt.sign(payload, secret, options);
}; 