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
        if (draft[categoryId]) {
          draft[categoryId].name = newName;
        }
      })
    );
  };

  const deleteCategory = (categoryId) => {
    setCategories(
      produce((draft) => {
        delete draft[categoryId];
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
          completed: false,
          deadline: taskDeadline,
          createdAt: new Date().toISOString(),
        });
      })
    );
  };

  const updateTask = (categoryId, taskId, updates) => {
    setCategories(
      produce((draft) => {
        const task = draft[categoryId].tasks.find(
          (t) => t.id === taskId
        );
        if (task) {
          Object.assign(task, updates);
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
        draft[categoryId].tasks = draft[categoryId].tasks.filter(
          (task) => task.id !== taskId
        );
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
