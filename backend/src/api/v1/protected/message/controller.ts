import { Types } from 'mongoose';
import Message from '@db/models/message.model';
import Conversation from '@db/models/conversation.model'; // Import the conversation model
import { NextFunction, Request, Response } from 'express';
import CustomError from '@/utils/customError';

export const findMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;
    if (!user) throw new CustomError('User ID is required', 400);

    // Get conversationId and pagination parameters from req.query
    const conversationId = req.query.conversationId as string;
    const page = parseInt(req.query.page as string, 10) || 1; // Default page is 1
    const limit = parseInt(req.query.limit as string, 10) || 10; // Default limit is 10

    if (!conversationId) {
      throw new CustomError('Conversation ID is required', 400);
    }

    // Fetch the conversation to check if the user is a participant
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new CustomError('Conversation not found', 404);
    }

    // Check if the user is in the participants array
    const userId = new Types.ObjectId(user._id);
    const isParticipant = conversation.participants.includes(userId);
    if (!isParticipant) {
      throw new CustomError(
        'You do not have permission to access these messages',
        403,
      );
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch messages with pagination, sorted by createdAt (most recent first)
    const messages = await Message.find({ conversationId })
      .sort({ createdAt: -1 }) // Sort by createdAt, most recent first
      .skip(skip)
      .limit(limit)
      .exec();

    // Get the total number of messages for the conversation
    const totalMessages = await Message.countDocuments({ conversationId });

    // Calculate total pages
    const totalPages = Math.ceil(totalMessages / limit);

    // Return paginated response
    res.status(200).json({
      messages,
      pagination: {
        page,
        limit,
        totalMessages,
        totalPages,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
};
