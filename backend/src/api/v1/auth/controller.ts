import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';
import User from '@db/models/user.model';
import { generateToken } from '@/lib/token';
import CustomError from '@/utils/customError';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { fullName, userEmail, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword)
      throw new CustomError(`Passwords don't match`, 400);

    const user = await User.findOne({ userEmail });

    if (user) throw new CustomError(`User Email already exists`, 400);

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      userEmail,
      password: hashedPassword,
      gender,
      profilePic: `https://avatar.iran.liara.run/public/${gender === 'male' ? 'boy' : 'girl'}?username=${fullName.split(' ')[0]}`,
    });

    if (newUser) {
      // Generate JWT token here
      const token = generateToken(newUser._id.toString());
      res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // MS
      });
      await newUser.save();

      res.status(201).json({
        _id: newUser._id.toString(),
        token,
        fullName: newUser.fullName,
        userEmail: newUser.userEmail,
        profilePic: newUser.profilePic,
      });
    } else {
      throw new CustomError(`Invalid user data`, 400);
    }
  } catch (error: unknown) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userEmail, password } = req.body;

    const user = await User.findOne({ userEmail });
    if (!user) {
      throw new CustomError('Invalid user email or password', 400);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new CustomError('Invalid user email or password', 400);
    }

    const token = generateToken(user._id.toString());
    res.cookie('jwt', token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    });

    res.status(200).json({
      _id: user._id.toString(),
      fullName: user.fullName,
      token,
      userEmail: user.userEmail,
      profilePic: user.profilePic,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const signOut = (
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: unknown) {
    next(error);
  }
};
