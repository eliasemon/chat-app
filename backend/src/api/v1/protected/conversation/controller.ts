/* eslint-disable no-restricted-syntax */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Conversation from '@/db/models/conversation.model';
import CustomError from '@/utils/customError';
import User from '@/db/models/user.model';

export const createConversation = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;
    const { participants, type, name } = req.body;

    // Add the current user to the participants list
    participants.push(user?._id);

    // Validate participants array
    if (!participants || participants.length === 0) {
      return next(new CustomError('Participants array cannot be empty.', 400));
    }

    // Ensure all participants are valid ObjectIds
    for (const participantId of participants) {
      if (!mongoose.Types.ObjectId.isValid(participantId)) {
        return next(
          new CustomError(`Invalid participant ID: ${participantId}`, 400),
        );
      }

      // Optionally check if the user exists in the User collection
      // eslint-disable-next-line no-await-in-loop
      const userExists = await User.findById(participantId);
      if (!userExists) {
        return next(new CustomError(`User not found: ${participantId}`, 404));
      }
    }

    // Additional validation for individual conversations
    if (type === 'individual') {
      if (participants.length !== 2) {
        return next(
          new CustomError(
            'Individual conversations must have exactly 2 participants.',
            400,
          ),
        );
      }

      // Check if an individual conversation with the same participants already exists
      const existingConversations = await Conversation.find({
        participants: { $all: participants }, // Ensure that all participants are included in the conversation
        type: 'individual',
      });

      if (existingConversations.length > 0) {
        res.status(200).json({ ...existingConversations[0].toJSON() });
        return;
      }
    }

    // Additional validation for group conversations
    if (type === 'group' && participants.length <= 2) {
      return next(
        new CustomError(
          'Group conversations must have more than 2 participants.',
          400,
        ),
      );
    }

    // Create a new conversation
    const lastMessage = `${user?.fullName}: has created a new conversation with you.`;
    const conversation = new Conversation({
      participants,
      type,
      name,
      lastMessage,
    });
    const savedConversation = await conversation.save();

    res.status(201).json({
      ...savedConversation.toJSON(),
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const findConversatios = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user } = req;
    if (user === null || user === undefined)
      throw new CustomError('User Id is required', 400);

    // Get pagination parameters from req.query (with default values)
    const page = parseInt(req.query.page as string, 10) || 1; // Default page is 1
    const limit = parseInt(req.query.limit as string, 10) || 10; // Default limit is 10

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch conversations with pagination, sorting by updatedAt
    const conversations = await Conversation.find({ participants: user._id })
      .sort({ updatedAt: -1 }) // Sort by updatedAt, most recent first
      .skip(skip)
      .limit(limit)
      .exec();

    // Get the total number of conversations for the user
    const totalConversations = await Conversation.countDocuments({
      participants: user._id,
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalConversations / limit);

    // Return paginated response
    res.status(200).json({
      conversations,
      pagination: {
        page,
        limit,
        totalConversations,
        totalPages,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const leaveGroupConversation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { conversationId } = req.params; // Get the conversation ID from URL params
    const userId = new mongoose.Types.ObjectId(req.user?._id); // Get the user's ID from req.user (assuming it's set in middleware)
    // Find the conversation
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) throw new CustomError('Conversation not found.', 404);

    // Check if it's a group conversation
    if (conversation.type !== 'group')
      throw new CustomError('You can only leave group conversations.', 400);

    // Check if the user is a participant in the conversation
    const isParticipant = conversation.participants.some((participant) =>
      participant.equals(userId),
    );

    if (!isParticipant) {
      return next(
        new CustomError('You are not a participant in this conversation.', 403),
      );
    }

    // Remove the user from the participants array
    conversation.participants = conversation.participants.filter(
      (participant) => !participant.equals(userId),
    );

    // If the user is the last participant, delete the conversation
    if (conversation.participants.length === 0) {
      await conversation.deleteOne();
      return res.status(200).json({ message: 'Conversation deleted.' });
    }

    // Save the updated conversation
    await conversation.save();

    res.status(200).json({ message: 'You have left the conversation.' });
  } catch (error) {
    next(error);
  }
};

export const updateGroupDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { conversationId } = req.params; // Get conversation ID from the URL
    const { name, imgUrl, newParticipants } = req.body; // Get new group name, imageUrl, and new participants from request body
    const userId = new mongoose.Types.ObjectId(req.user?._id); // Assuming the user's ID is available in req.user

    // Find the conversation
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return next(new CustomError('Conversation not found.', 404));
    }

    // Check if it's a group conversation
    if (conversation.type !== 'group') {
      return next(
        new CustomError('Only group conversations can be updated.', 400),
      );
    }

    // Check if the user is a participant in the group
    const isParticipant = conversation.participants.some((participant) =>
      participant.equals(userId),
    );

    if (!isParticipant) {
      return next(
        new CustomError('You are not a participant in this conversation.', 403),
      );
    }

    // Update the group details (name and imgUrl if provided)
    if (name) {
      conversation.name = name;
    }
    if (imgUrl) {
      conversation.imgUrl = imgUrl;
    }

    // Adding new participants if provided
    if (newParticipants && newParticipants.length > 0) {
      for (const newParticipantId of newParticipants) {
        try {
          // Check if the user exists in the database
          // eslint-disable-next-line no-await-in-loop
          const userExists = await User.findById(newParticipantId);
          if (userExists) {
            // Check if the user is already a participant in the group
            const alreadyParticipant = conversation.participants.some(
              (participant) => participant.equals(userExists._id),
            );
            if (!alreadyParticipant) {
              conversation.participants.push(
                new mongoose.Types.ObjectId(userExists._id),
              );
            }
          }
        } catch (error) {
          return next(error);
        }
      }
    }

    // Save the updated conversation
    await conversation.save();

    res.status(200).json({
      message: 'Group conversation details updated successfully.',
      conversation,
    });
  } catch (error) {
    next(error);
  }
};
