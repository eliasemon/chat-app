import Auth from './pages/Auth/Auth';
import Home from './pages/home/Home';
import { useStore } from './store/store';
// import Home from './pages/home/Home';
function App() {
  const user = useStore((state) => state.user);
  console.log(user);
  return <div className="h-screen w-screen">{user ? <Home /> : <Auth />}</div>;
}

export default App;
