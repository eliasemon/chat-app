import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import Message, { IMessage } from '@db/models/message.model';
import { getUserSocketId } from '@/socket';
import Conversation from '@/db/models/conversation.model';

const newMessage = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void,
) => {
  const { user } = socket.data;
  socket.on('newMessage', async (data: Partial<IMessage>) => {
    try {
      const { type, message, conversationId } = data;
      if (!type || !message || !conversationId)
        throw new Error('Invalid message data');
      const conversation = await Conversation.findOne({
        _id: conversationId,
      });

      if (!conversation) throw new Error('Conversation not found');
      const newMessage = new Message({
        ...data,
        userId: user._id,
      });
      const savedMessage = await newMessage.save();
      conversation.participants.forEach((participant) => {
        if (participant._id.toString() !== user._id.toString()) {
          const receiverSocketId = getUserSocketId(participant._id.toString());

          if (receiverSocketId)
            socket.to(receiverSocketId).emit('newMessage', savedMessage);
        }
      });
      await conversation.updateOne({
        lastMessage: `${user.fullName}: ${message.slice(0, 10)}`,
      });
      await conversation.save();
    } catch (error: unknown) {
      if (error instanceof Error) next(error);
    }
  });
  next();
};

export default newMessage;
