const DeleteTaskButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-5 h-5 
          rounded-full 
          bg-red-500 
          hover:bg-red-600 
          flex items-center 
          justify-center 
          text-white 
          transition-colors
          border-2 border-red-600"
    >
      {children}
    </button>
  );
};

export { DeleteTaskButton };
