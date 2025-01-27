import Image from 'next/image';
import { TaskCheckbox } from './Forms/TaskCompletion';

const TaskGridSection = ({
  categoryId,
  tasks,
  handleTaskCompletion,
}) => {
  // First, we need to calculate how many tasks can fit in one grid section
  const calculateTasksPerGrid = () => {
    // We account for viewport width minus any margins/padding
    const viewportWidth = window.innerWidth - 64;
    const minTaskWidth = 300;
    // Calculate how many columns we can fit
    const columnsPerRow = Math.floor(viewportWidth / minTaskWidth);

    // For rows, we use the fixed grid height
    const gridHeight = window.innerHeight; // Viewport minus headers
    const taskHeight = 250; // Our fixed task height
    const rowsPerGrid = Math.floor(gridHeight / taskHeight);

    // Total tasks that can fit in one grid
    return columnsPerRow * rowsPerGrid;
  };

  // Split our tasks into groups that will each get their own complete grid section
  const splitTasksIntoGrids = (tasks) => {
    const tasksPerGrid = calculateTasksPerGrid();
    const grids = [];

    for (let i = 0; i < tasks.length; i += tasksPerGrid) {
      grids.push(tasks.slice(i, i + tasksPerGrid));
    }

    return grids;
  };

  const gridGroups = splitTasksIntoGrids(tasks);

  return (
    // We wrap our grid sections in a container that will stack them vertically
    <div
      className="flex flex-col gap-8"
      style={{
        border: '3px solid red',
      }}
    >
      {gridGroups.map((gridTasks, index) => (
        // Each grid section is a complete copy of your original main section
        <main
          key={index}
          className="flex-1 relative"
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(300px, 1fr))',
            maxWidth: '100%',
            minHeight: '100vh',
          }}
        >
          {/* We keep the exact structure you had, but use our subdivided tasks */}
          <>
            {gridTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white shadow p-4 flex flex-col items-center relative border-2 border-black"
                style={{
                  minWidth: '300px',
                  // Fixed height for consistent sizing (removed for now)
                }}
              >
                <h3 className="text-lg font-semibold">
                  {task.title}
                </h3>
                <p className="text-gray-600 mt-2">{task.desc}</p>
                <p className="text-gray-600 mt-2">{task.deadline}</p>
                <div>
                  <TaskCheckbox
                    isCompleted={task.isCompleted}
                    onChange={() =>
                      handleTaskCompletion(categoryId, task.id)
                    }
                  />
                </div>
              </div>
            ))}
            {/* Each grid section gets its own background image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src="/taskVenom-desktop.jpg"
                alt="task background"
                className="object-cover"
                fill
              />
            </div>
          </>
        </main>
      ))}
    </div>
  );
};

export { TaskGridSection };
