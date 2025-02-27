'use client';

import {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';

import { produce } from 'immer';

const TaskContext = createContext(null);

export function useTaskManager() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      'useTaskManager can only be used within TaskProvider'
    );
  }

  return context;
}

export function TaskProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(
      window.localStorage.getItem('taskCategories')
    );

    console.log(savedTasks);

    if (savedTasks === null) {
      return;
    }

    setCategories(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'taskCategories',
      JSON.stringify(categories)
    );
  }, [categories]);

  // Category management functions
  const addCategory = (name) => {
    setCategories(
      produce((draft) => {
        draft.push({
          name,
          id: crypto.randomUUID(),
          tasks: [],
        });
      })
    );
  };

  const updateCategory = (categoryId, newName) => {
    setCategories(
      produce((draft) => {
        const index = draft.findIndex(
          (category) => category.id === categoryId
        );
        if (index !== -1) {
          draft[index].name = newName;
        }
      })
    );
  };

  const deleteCategory = (categoryId) => {
    setCategories(
      produce((draft) => {
        return draft.filter((category) => category.id !== categoryId);
      })
    );
  };

  // Task management functions
  const addTask = (categoryId, taskTitle, taskDesc, taskDeadline) => {
    setCategories(
      produce((draft) => {
        const categoryIndex = draft.findIndex(
          (category) => category.id === categoryId
        );

        if (!draft[categoryIndex]) {
          throw new Error(`Category ${categoryId} not found`);
        }
        draft[categoryIndex].tasks.push({
          id: crypto.randomUUID(),
          title: taskTitle,
          desc: taskDesc,
          isCompleted: false,
          deadline: taskDeadline,
          createdAt: new Date().toISOString(),
        });
      })
    );
  };

  const handleTaskCompletion = (categoryId, taskId) => {
    setCategories(
      produce((draft) => {
        const categoryIndex = draft.findIndex(
          (category) => category.id === categoryId
        );
        const taskIndex = draft[categoryIndex].tasks.findIndex(
          (task) => task.id === taskId
        );
        if (taskIndex !== -1) {
          draft[categoryIndex].tasks[taskIndex].isCompleted =
            !draft[categoryIndex].tasks[taskIndex].isCompleted;
        }
      })
    );
  };

  const moveTask = (fromCategoryId, toCategoryId, taskId) => {
    setCategories(
      produce((draft) => {
        const fromTasks = draft[fromCategoryId].tasks;
        const taskIndex = fromTasks.findIndex((t) => t.id === taskId);
        if (taskIndex === -1) return;

        // Move the task to the new category
        const [task] = fromTasks.splice(taskIndex, 1);
        draft[toCategoryId].tasks.push(task);
      })
    );
  };

  const deleteTask = (categoryId, taskId) => {
    setCategories(
      produce((draft) => {
        const categoryIndex = draft.findIndex(
          (category) => category.id === categoryId
        );
        const taskIndex = draft[categoryIndex].tasks.findIndex(
          (task) => task.id === taskId
        );
        if (taskIndex !== -1) {
          draft[categoryIndex].tasks.splice(taskIndex, 1);
        }
      })
    );
  };

  const updateTask = (
    categoryId,
    taskId,
    taskTitle,
    taskDesc,
    taskDeadline
  ) => {
    setCategories(
      produce((draft) => {
        const category = draft.find(
          (category) => category.id === categoryId
        );

        if (!category) {
          throw new Error(`Category ${categoryId} not found`);
        }

        const taskToUpdate = category.tasks.find(
          (task) => task.id === taskId
        );

        if (!taskToUpdate) {
          throw new Error(
            `Task ${taskId} not found in category ${categoryId}`
          );
        }

        taskToUpdate.title = taskTitle;
        taskToUpdate.desc = taskDesc;
        taskToUpdate.deadline = taskDeadline;
      })
    );
  };

  // Statistics and utility functions
  const getCategoryStats = (categoryId) => {
    const category = categories[categoryId];
    if (!category) return null;

    return {
      total: category.tasks.length,
      completed: category.tasks.filter((t) => t.completed).length,
      pending: category.tasks.filter((t) => !t.completed).length,
    };
  };

  const value = {
    categories,
    setCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    addTask,
    updateTask,
    handleTaskCompletion,
    moveTask,
    deleteTask,
    getCategoryStats,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
