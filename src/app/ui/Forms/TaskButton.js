const TaskButton = ({ onClick, children }) => {
  function handleClick(e) {
    e.stopPropagation();
    onClick();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
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
