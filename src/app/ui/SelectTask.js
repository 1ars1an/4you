import { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { useRouter } from 'next/navigation';

let SelectTask = ({ categories }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const selectedTask = categories[selectedValue] || null;

  const router = useRouter();

  return (
    <Select.Root
      value={selectedValue}
      onValueChange={(newValue) => {
        setSelectedValue(newValue);
        router.push('/settings');
      }}
    >
      <Select.Trigger className="inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white text-[16px] leading-none">
        <Select.Value placeholder="Category" />
        <Select.Icon />
      </Select.Trigger>

      <Select.Portal>
        <Select.Content>
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Group>
              {categories?.map((category) => (
                <Select.Item
                  key={category.id}
                  value={category.name}
                  className="relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none"
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
