import { Request, Response, NextFunction } from 'express';
import User from '@db/models/user.model'; // Adjust the import path as necessary
import CustomError from '@/utils/customError';

export const searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Extract the search query parameter
    const searchQuery = req.query.search as string;

    // Build the regex pattern
    const regex = new RegExp(searchQuery, 'i'); // 'i' for case-insensitive search
    // Find user(s) matching the regex pattern in fullName or userEmail
    const users = await User.find({
      $or: [{ fullName: { $regex: regex } }, { userEmail: { $regex: regex } }],
    }).select('-password');

    if (users.length === 0) {
      throw new CustomError('No users found matching the search criteria', 404);
    }

    // Return the found user(s)
    res.status(200).json(users);
  } catch (error: unknown) {
    next(error);
  }
};

export const findUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Extract userId from route params
    const { userId } = req.params;

    // Find the user by userId
    const user = await User.findById(userId).select('-password');

    if (!user) {
      throw new CustomError('User not found', 404);
    }

    // Return the found user
    res.status(200).json(user);
  } catch (error: unknown) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const { fullName, gender, profilePic } = req.body;

    // Find the user and update only allowed fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        gender,
        profilePic,
      },
      { new: true, runValidators: true }, // Return the updated document and validate schema
    );

    if (!updatedUser) throw new CustomError('User not found', 404);

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    if (error instanceof Error || error instanceof CustomError) next(error);
  }
};
