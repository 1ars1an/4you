import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useTaskManager } from '../../lib/providers/TaskProvider';

import { Folder, FolderPlus } from 'lucide-react';

let RxDialog = () => {
  const { addCategory } = useTaskManager();

  // Local state to control the dialog's open/close state
  const [isOpen, setIsOpen] = useState(false);

  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(categoryName);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button>
          <FolderPlus></FolderPlus>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px]">
          <Dialog.Title>Add New Task Category</Dialog.Title>
          <Dialog.Description></Dialog.Description>
          <form onSubmit={handleSubmit}>
            <fieldset className="flex items-center my-8 gap-4">
              <div className="">
                <label
                  htmlFor="taskname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="taskname"
                  name="taskname"
                  value={categoryName}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </fieldset>

            <div>
              <button type="submit">Create</button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
              aria-label="Close"
            >
              X
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { RxDialog };
