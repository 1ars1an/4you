const TaskCheckbox = ({ isCompleted, onChange }) => {
  return (
    <input
      type="checkbox"
      checked={isCompleted}
      onChange={onChange}
      className={`
          w-5 h-5 
          border-2 border-gray-300 
          rounded-full
          cursor-pointer
          appearance-none
          transition-colors
          ${isCompleted ? 'bg-green-500' : 'bg-white'}
        `}
    />
  );
};

export { TaskCheckbox };
