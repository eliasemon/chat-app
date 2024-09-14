import mongoose, { Document, Schema, Model, model } from 'mongoose';

// Define an interface for the Message document
export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId | string;
  userId: mongoose.Types.ObjectId | string;
  message: string;
  type: 'text' | 'file' | 'image' | 'video';
}

// Define the schema
const messageSchema: Schema<IMessage> = new mongoose.Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['text', 'file', 'image', 'video'],
      required: true,
    },
  },
  { timestamps: true },
);

// Create the model
const Message: Model<IMessage> = model<IMessage>('Message', messageSchema);

export default Message;
