import Userboard from '../../components/Userboard';
import ChatHistory from '../../components/ChatHistory';
import ChatWindow from '../../components/ChatWindow';

const Home = () => (
  <main className="flex h-full">
    <Userboard />
    <ChatHistory />
    <ChatWindow />
  </main>
);

export default Home;
