interface NavOptionProps {
  src: string;
  title: string;
}

const NavOption: React.FC<NavOptionProps> = ({ src, title }) => {
  return (
    <div className="flex items-center px-2 py-2 rounded-lg hover:bg-slate-100 hover:cursor-pointer ">
      <img src={src} alt="nav_option" className="size-[18px]" />
      <h4 className="text-sm text-gray-500 mx-2">{title}</h4>
    </div>
  );
};

export default NavOption;
