import jwt from 'jsonwebtoken';
import User from '@db/models/user.model';
import CustomError from '@/utils/customError';

interface DecodedToken {
  userId: string;
}

export const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '15d',
  });
  return token;
};

export const verifyToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET as string,
  ) as DecodedToken;

  if (!decoded) throw new CustomError('Unauthorized - Invalid Token', 401);

  const user = await User.findById(decoded.userId).select('-password');

  if (!user) throw new CustomError('User not found', 404);
  return user;
};
