import * as AlertDialog from '@radix-ui/react-alert-dialog';

const RxAlertDialog = ({ categoryId, deleteCategory, router }) => {
  function handleClick() {
    deleteCategory(categoryId);
    router.push('/');
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button onClick={() => {}}>ICON</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Warning: Deleting the category is an irreversible action!
          </AlertDialog.Description>
          <div className="flex gap-2">
            <AlertDialog.Cancel asChild>
              <button>Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button onClick={() => handleClick()}>Delete</button>
            </AlertDialog.Action>
          </div>
          <AlertDialog.Cancel />
          <AlertDialog.Action />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export { RxAlertDialog };
