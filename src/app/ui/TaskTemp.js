const TaskGridLayout = ({ tasks }) => {
  // Calculate how many tasks fit in one grid
  const calculateTasksPerGrid = () => {
    const viewportWidth = window.innerWidth - 64; // Account for padding/margins
    const minTaskWidth = 300;
    const columnsPerRow = Math.floor(viewportWidth / minTaskWidth);

    // With fixed height cells, we can determine rows per grid
    const gridHeight = window.innerHeight - 128; // Viewport minus headers
    const taskHeight = 250; // Our fixed task height
    const rowsPerGrid = Math.floor(gridHeight / taskHeight);

    return columnsPerRow * rowsPerGrid;
  };

  // Split tasks into separate grids
  const splitTasksIntoGrids = (tasks) => {
    const tasksPerGrid = calculateTasksPerGrid();
    const grids = [];

    for (let i = 0; i < tasks.length; i += tasksPerGrid) {
      grids.push(tasks.slice(i, i + tasksPerGrid));
    }

    return grids;
  };

  const gridTasks = splitTasksIntoGrids(tasks);

  return (
    <div className="flex flex-col gap-8">
      {gridTasks.map((gridTasks, index) => (
        <main
          key={index}
          className="flex-1 relative h-[calc(100vh-8rem)]"
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(300px, 1fr))',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          {gridTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow p-4 flex flex-col items-center relative border-2 border-black"
              style={{
                minWidth: '300px',
                height: '250px', // Fixed height for each task cell
              }}
            >
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600 mt-2">{task.desc}</p>
              <p className="text-gray-600 mt-2">{task.deadline}</p>
            </div>
          ))}
        </main>
      ))}
    </div>
  );
};

export { TaskGridLayout };
