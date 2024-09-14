import { Request, Response, NextFunction } from 'express';
import CustomError from '@/utils/customError';
import { verifyToken } from '@/lib/token';

const middleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new CustomError('Unauthorized - No Token Provided', 401);

    const user = await verifyToken(token);

    req.user = user;
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default middleware;
