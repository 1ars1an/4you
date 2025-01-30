'use client';

import { useParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { useTaskManager } from '@/app/lib/providers/TaskProvider';
import { globalSettingsContext } from '@/app/lib/providers/globalSettings';
import { useRouter } from 'next/navigation';

import { RxAlertDialog } from '@/app/ui/Dialogs/AlertDialog';
import { UpdateCat } from '../../ui/Forms/CatUpdate';
import { TaskCheckbox } from '@/app/ui/Forms/TaskCompletion';

import { Trash2 } from 'lucide-react';

export default function TaskSettings() {
  const params = useParams();
  const categoryId = params.taskSlug;

  const { categories, updateCategory, deleteCategory } =
    useTaskManager();

  const { shimmerEnabled, setShimmerEnabled } = useContext(
    globalSettingsContext
  );

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
      <section className="flex flex-col">
        <h3>Delete Category</h3>
        <RxAlertDialog
          categoryId={categoryId}
          deleteCategory={deleteCategory}
          router={router}
        ></RxAlertDialog>
      </section>
      <section>
        <h3>Set Task Completion Animations</h3>
        <TaskCheckbox
          isCompleted={shimmerEnabled}
          onChange={() => {
            setShimmerEnabled(!shimmerEnabled);
          }}
        ></TaskCheckbox>
      </section>
    </div>
  );
}
