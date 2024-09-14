import { Socket } from 'socket.io';
import cookie from 'cookie';
import { io } from './index';
import logger from '@/utils/logger';
import { verifyToken } from '@/lib/token';
import newMessage from './io/newMessage';
import CustomError from './utils/customError';

// Mapping of user IDs to socket IDs
const userSocketMap: Record<string, string> = {};

const getUserSocketId = (userId: string): string | undefined =>
  userSocketMap[userId];

const ioConnection = async () => {
  io.use(async (socket: Socket, next) => {
    const cookies = socket.handshake.headers.cookie;

    if (!cookies) {
      return next(new Error('Authentication error: No cookies found'));
    }

    const parsedCookies = cookie.parse(cookies);
    const token = parsedCookies.jwt;

    if (!token) {
      return next(new Error('Authentication error: No token found in cookies'));
    }

    try {
      // verifyToken is a function that verifies the cookie/token
      const user = await verifyToken(token);
      socket.data.user = user;
      next();
    } catch (error) {
      if (error instanceof CustomError || error instanceof Error) next(error);
    }
  });
  io.use(newMessage);
  io.on('connection', (socket: Socket) => {
    logger.log('a user connected', socket.id);

    const userId = socket.data.user._id as string | string[] | undefined;
    if (userId && userId !== 'undefined') {
      const resolvedUserId = Array.isArray(userId) ? userId[0] : userId;
      userSocketMap[resolvedUserId] = socket.id;
    }

    // Emit the list of online users to all connected clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // Handle user disconnection
    socket.on('disconnect', () => {
      logger.log('user disconnected', socket.id);

      if (userId) {
        const resolvedUserId = Array.isArray(userId) ? userId[0] : userId;
        delete userSocketMap[resolvedUserId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
      }
    });
  });
};

export { io, getUserSocketId, ioConnection };
