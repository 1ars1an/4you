'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useTaskManager } from '@/app/lib/providers/TaskProvider';
import { useRouter } from 'next/navigation';

import { RxAlertDialog } from '@/app/ui/AlertDialog';
import { UpdateCat } from '../../ui/Forms/CatUpdate';

export default function TaskSettings() {
  const params = useParams();
  const categoryId = params.taskSlug;

  const { categories, updateCategory, deleteCategory } =
    useTaskManager();

  const router = useRouter();

  return (
    <div>
      <section className="flex flex-col">
        <h3>Update Category</h3>
        <div>
          <UpdateCat
            categoryId={categoryId}
            updateCategory={updateCategory}
          ></UpdateCat>
        </div>
      </section>
      <section></section>
      <section className="flex flex-col">
        <h3>Delete Category</h3>
        <RxAlertDialog
          categoryId={categoryId}
          deleteCategory={deleteCategory}
          router={router}
        ></RxAlertDialog>
      </section>
    </div>
  );
}
