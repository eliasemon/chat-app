import mongoose, { Schema, Document, Model } from 'mongoose';
import CustomError from '@/utils/customError';

// Define the enum for conversation types
export enum ConversationType {
  INDIVIDUAL = 'individual',
  GROUP = 'group',
}

// Define the interface for the Conversation document
export interface IConversation extends Document {
  name?: string;
  participants: mongoose.Types.ObjectId[]; // Array of ObjectId references to the User model
  type: ConversationType; // Type of the conversation (individual or group)
  lastMessage?: string;
  imgUrl?: string;
}

// Create the schema
const conversationSchema: Schema<IConversation> = new Schema(
  {
    name: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    type: {
      type: String,
      enum: Object.values(ConversationType), // Restrict the type to the enum values
      required: true,
    },
    lastMessage: {
      type: String,
      ref: 'Message',
    },
  },
  { timestamps: true },
);

// Add custom validation function
conversationSchema.pre('validate', function fn(next) {
  const conversation = this as IConversation;

  // Check if participants array is not empty
  if (conversation.participants.length === 0) {
    return next(new CustomError('Participants array cannot be empty.', 400));
  }

  // Validation for individual conversations
  if (
    conversation.type === ConversationType.INDIVIDUAL &&
    conversation.participants.length !== 2
  ) {
    return next(
      new CustomError(
        'Individual conversations must have exactly 2 participants.',
        400,
      ),
    );
  }

  // Validation for group conversations
  if (
    conversation.type === ConversationType.GROUP &&
    conversation.participants.length <= 2
  ) {
    return next(
      new CustomError(
        'Group conversations must have more than 2 participants.',
        400,
      ),
    );
  }

  next();
});

// Create the model
const Conversation: Model<IConversation> = mongoose.model<IConversation>(
  'Conversation',
  conversationSchema,
);

export default Conversation;
