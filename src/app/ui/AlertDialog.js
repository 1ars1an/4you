import * as AlertDialog from '@radix-ui/react-alert-dialog';

const RxAlertDialog = ({ isOpen }) => (
  <AlertDialog.Root isOpen={isOpen}>
    <AlertDialog.Trigger />
    <AlertDialog.Portal>
      <AlertDialog.Overlay />
      <AlertDialog.Content>
        <AlertDialog.Title />
        <AlertDialog.Description />
        <AlertDialog.Cancel />
        <AlertDialog.Action />
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog.Root>
);

export { RxAlertDialog };
