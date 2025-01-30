'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTaskManager } from './lib/providers/TaskProvider';

import { RxDialog } from './ui/Dialogs/Dialog';
import { SelectTask } from './ui/SelectTask';

export default function Home() {
  const {
    categories,
    addCategory,
    addTask,
    updateTask,
    deleteTask,
    getCategoryStats,
  } = useTaskManager();

  const [categorySelect, toggleCategorySelect] = useState(false);

  return (
    <section className="h-[calc(100vh-4rem)] w-[calc(100vw-4rem)] mx-auto flex flex-col">
      <div className="flex py-4">
        <div className="mr-auto flex gap-4 items-center">
          <h3 className="">Select Category</h3>
        </div>
        <div className="flex gap-4 items-center">
          <SelectTask categories={categories}></SelectTask>
          <RxDialog></RxDialog>
        </div>
      </div>
    </section>
  );
}
