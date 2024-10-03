import Avatar from './ui/Avatar';
import Button from './ui/Button';
import { User } from '../store/authSlice';

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="flex items-center px-3 my-4 bg-slate-100 rounded-xl">
      <Avatar src={user.profilePic} userName={user.fullName} />
      <div className="flex-1 mx-3">
        <h3 className="font-semibold">{user.fullName}</h3>
        {/* <p className="text-sm text-gray-400">{user.status}</p> */}
      </div>
      <Button onClick={() => 0}>
        <img src="./chevron_down.png" alt="down_arrow" />
      </Button>
    </div>
  );
};

export default UserCard;
