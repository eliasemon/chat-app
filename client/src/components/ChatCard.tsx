import Avatar from './ui/Avatar';

interface ChatCardProps {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
}

const ChatCard: React.FC<ChatCardProps> = ({
  name,
  image,
  lastMessage,
  lastMessageTime,
  unread,
}) => {
  return (
    <div className="flex gap-3 items-center px-3 mx-1 rounded-md hover:cursor-pointer hover:bg-gray-50">
      <Avatar src={image} userName={name} />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-400">{lastMessageTime}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">{lastMessage}</p>

          {unread && <div className="w-2 h-2 bg-green-600 rounded-full" />}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
