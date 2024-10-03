interface AvatarProps {
  src?: string;
  userName: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, userName }) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-300 my-6 ">
      {src ? (
        <img src={src} alt={`${userName}_image`} className="w-full h-full" />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h3 className="text-lg">{userName.charAt(0)}</h3>
        </div>
      )}
    </div>
  );
};

export default Avatar;
