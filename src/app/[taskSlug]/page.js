'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { useTaskManager } from '../lib/providers/TaskProvider';

import { RxDialog } from '../ui/Dialogs/Dialog';
import { TaskDialog } from '../ui/Dialogs/TaskDialog';
import { SelectTask } from '../ui/SelectTask';
import { TaskGridSection } from '../ui/TaskGrid';

export default function Task() {
  const params = useParams();

  const categoryId = params.taskSlug;

  const {
    categories,
    addCategory,
    addTask,
    updateTask,
    deleteTask,
    getCategoryStats,
  } = useTaskManager();

  const currentTask =
    categories.find((category) => category.id === categoryId) || null;

  return (
    <section className="h-[calc(100vh-4rem)] w-[calc(100vw-4rem)] mx-auto flex flex-col">
      {/* Shared Header */}
      <div className="flex py-4">
        <div className="mr-auto flex gap-4 items-center">
          <h3 className="">
            {currentTask ? currentTask.name : 'Error'}
          </h3>
          {currentTask ? (
            <Link href={`${categoryId}/settings`}>Settings</Link>
          ) : undefined}
        </div>
        <div className="flex gap-4 items-center">
          <TaskDialog categoryId={categoryId} />
          <SelectTask />
          <RxDialog />
        </div>
      </div>
      {currentTask && (
        <TaskGridSection tasks={currentTask.tasks}></TaskGridSection>
      )}
    </section>
  );
}
