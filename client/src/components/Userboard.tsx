import { useState } from 'react';
import Button from './ui/Button';
import NavOption from './ui/NavOption';
import UserCard from './UserCard';
import { useStore } from '../store/store';

const navOptions = [
  {
    id: 'new_group',
    src: './new_group.png',
    title: 'New Group',
  },
  {
    id: 'contacts',
    src: './contacts.png',
    title: 'Contacts',
  },
  {
    id: 'save_messages',
    src: './save_messages.png',
    title: 'Save Messages',
  },
];

const Userboard = () => {
  const [open, setOpen] = useState(true);
  const user = useStore((state) => state.user);

  if (open)
    return (
      <div className="w-2/12 h-full p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <img src="./logo.png" alt="logo" />
          <Button onClick={() => setOpen(false)}>
            <img src="./arrow.png" alt="collapse_icon" />
          </Button>
        </div>

        {user && <UserCard user={user} />}

        <div className="flex-1 flex flex-col gap-1">
          {navOptions.map(({ id, src, title }) => (
            <NavOption key={id} src={src} title={title} />
          ))}
        </div>
        <div className="">
          <NavOption src="./settings.png" title="Settings" />
        </div>
      </div>
    );
};

export default Userboard;
