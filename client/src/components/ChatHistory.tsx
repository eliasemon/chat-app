import ChatCard from './ChatCard';

const chatList = [
  {
    id: '1_user',
    name: 'Mahadi Apurbo',
    image: './user_1.png',
    lastMessage: 'How To Boost...',
    lastMessageTime: '2 min',
    unread: false,
  },
  {
    id: '2_user',
    name: 'Elias Emon',
    image: './user_2.png',
    lastMessage: 'How To Boost...',
    lastMessageTime: '2 hour',
    unread: true,
  },
  {
    id: '3_user',
    name: 'Mahadi Apurbo',
    image: './user_1.png',
    lastMessage: 'How To Boost...',
    lastMessageTime: '2 min',
    unread: false,
  },
  {
    id: '4_user',
    name: 'Elias Emon',
    image: './user_2.png',
    lastMessage: 'How To Boost...',
    lastMessageTime: '2 day',
    unread: true,
  },
  {
    id: '5_user',
    name: 'Mahadi Apurbo',
    image: './user_1.png',
    lastMessage: 'How To Boost...',
    lastMessageTime: '2 year',
    unread: true,
  },
];

const ChatHistory = () => {
  return (
    <div className="w-2/12 flex flex-col gap-2">
      <div className="flex gap-1 border border-gray-200 rounded-md px-2 py-1 m-4">
        <img src="./search.png" alt="search_icon" />
        <input
          type="text"
          placeholder="Search Contact..."
          className="bg-transparent outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {chatList.map((chat) => (
          <ChatCard key={chat.id} {...chat} />
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
