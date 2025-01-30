import { useState, useEffect } from 'react';
import * as Select from '@radix-ui/react-select';
import { useRouter } from 'next/navigation';
import { useTaskManager } from '../lib/providers/TaskProvider';
import { Coming_Soon } from 'next/font/google';

let SelectTask = () => {
  const { categories } = useTaskManager();

  const [selectedValue, setSelectedValue] = useState('');
  const selectedTask =
    categories.find((category) => {
      return category.id === selectedValue;
    }) || null;

  const router = useRouter();

  useEffect(() => {
    if (!selectedTask) {
      return;
    }

    router.push(`${selectedTask.id}`);
  }, [selectedTask, router]);

  return (
    <Select.Root
      value={selectedValue}
      onValueChange={setSelectedValue}
    >
      <Select.Trigger className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-4 py-2 text-[16px] leading-none border border-gray-300 shadow-sm">
        <Select.Value placeholder="Category" />
        <Select.Icon />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          side="bottom"
          align="start"
          className="w-[135px] bg-white shadow-md rounded-md p-2"
        >
          <Select.ScrollUpButton />
          <Select.Viewport className="">
            {' '}
            <Select.Group>
              {categories?.map((category) => (
                <Select.Item
                  key={category.id}
                  value={category.id}
                  className="relative flex h-[35px] select-none items-center rounded-md px-4 py-2 text-[14px] leading-none hover:bg-gray-100 cursor-pointer"
                >
                  <Select.ItemText>{category.name}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center" />
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export { SelectTask };
