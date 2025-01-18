'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { useTaskManager } from '../lib/providers/TaskProvider';

import { RxDialog } from '../ui/Dialog';
import { SelectTask } from '../ui/SelectTask';

export default function Task() {
  const params = useParams();

  const taskId = params.taskSlug;

  const {
    categories,
    addCategory,
    addTask,
    updateTask,
    deleteTask,
    getCategoryStats,
  } = useTaskManager();

  const currentTask =
    categories.find((category) => category.id === taskId) || null;

  console.log(currentTask);

  return (
    <section className="h-[calc(100vh-4rem)] w-[calc(100vw-4rem)] mx-auto flex flex-col border-2 border-black border-solid">
      {/* Shared Header */}
      <div className="flex py-4">
        <div className="mr-auto flex gap-4 items-center">
          <h3 className="">
            {currentTask ? currentTask.name : 'Error'}
          </h3>
          {currentTask ? (
            <Link href={`${taskId}/settings`}>Settings</Link>
          ) : undefined}
        </div>
        <div className="flex gap-4 items-center">
          <RxDialog />
          <SelectTask />
        </div>
      </div>

      {/* Conditional Main Section */}
      <main className="flex-1 relative grid">
        {currentTask ? (
          <Image
            src="/taskVenom-desktop.jpg"
            alt="task background"
            className="object-cover"
            fill
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-red-500">
              This task category does not exist!
            </h1>
            <p className="mt-4 text-lg">
              Please select a valid category.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Home
            </Link>
          </div>
        )}
      </main>
    </section>
  );
}
