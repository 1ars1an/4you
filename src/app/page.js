'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTaskManager } from './lib/providers/TaskProvider';

import { RxDialog } from './ui/Dialog';

export default function Home() {
  const {
    categories,
    addCategory,
    setCategories,
    addTask,
    updateTask,
    deleteTask,
    getCategoryStats,
  } = useTaskManager();

  const [categorySelect, toggleCategorySelect] = useState(false);

  return (
    <section className="h-[calc(100vh-4rem)] w-[calc(100vw-4rem)] mx-auto flex flex-col border-2 border-black border-solid">
      <div className="flex py-4">
        <h3 className="mr-auto">Temp</h3>
        <div className="flex gap-2">
          <RxDialog></RxDialog>
          <button>DP</button>
          <aside className="hidden">TASKS</aside>
          <button>ST</button>
        </div>
      </div>
      <main className="flex-1 relative grid">
        <Image
          src="/taskVenom-desktop.jpg"
          alt="task background"
          className="object-cover"
          fill
        />
      </main>
    </section>
  );
}
