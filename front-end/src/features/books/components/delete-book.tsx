import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { useUser } from '@/lib/auth';
import { useDeleteBook } from '../api/delete-book';

type DeleteBookProps = {
  id: string;
};

export const DeleteBook = ({ id }: DeleteBookProps) => {
  const user = useUser();
  const { addNotification } = useNotifications();

  const deleteBookMutation = useDeleteBook({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Libro Borrado',
        });
      },
    },
  });

  if (user.data?.id === id) return null;

  return (
    <ConfirmationDialog
      icon="danger"
      title="Borrar Libro"
      body="¿Estas seguro que quieres borrar este libro?"
      triggerButton={<Button variant="destructive">Delete</Button>}
      confirmButton={
        <Button
          isLoading={deleteBookMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteBookMutation.mutate({ bookId: id })}
        >
          Delete Book
        </Button>
      }
    />
  );
};
