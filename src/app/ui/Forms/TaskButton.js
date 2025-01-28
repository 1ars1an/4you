const TaskButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-5 h-5 
          rounded-full
          flex items-center 
          justify-center 
          text-black
          border-2 border-red-600"
    >
      {children}
    </button>
  );
};

export { TaskButton };
