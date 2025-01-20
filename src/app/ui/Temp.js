{
  currentTask.tasks.map((task) => {
    return (
      <div
        key={task.id}
        className="bg-white shadow p-4 flex flex-col items-center relative border-2 border-black"
        style={{
          minWidth: '300px',
          minheight: '250px',
        }}
      >
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-gray-600 mt-2">{task.desc}</p>
        <p className="text-gray-600 mt-2">{task.deadline}</p>
      </div>
    );
  });
}
