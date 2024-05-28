import { Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormDrawer, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { updateBookInputSchema, useUpdateBook } from '../api/update-book';
import { Book } from '@/types/api';

type UpdateBookProps = {
  book: Book;
};

export const UpdateBook = ({ book }: UpdateBookProps) => {
  const { addNotification } = useNotifications();

  const updateBookMutation = useUpdateBook({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Book Updated',
        });
      },
    },
  });

  return (
    <FormDrawer
      isDone={updateBookMutation.isSuccess}
      triggerButton={
        <Button icon={<Pen className="size-4" />} size="sm">
          Update Book
        </Button>
      }
      title="Update Book"
      submitButton={
        <Button
          form="update-book"
          type="submit"
          size="sm"
          isLoading={updateBookMutation.isPending}
        >
          Submit
        </Button>
      }
    >
      <Form
        id="update-book"
        onSubmit={(values) => {
          updateBookMutation.mutate({ data: values });
        }}
        options={{
          defaultValues: {
            id: book.id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            price: book.price,
            stock: book.stock,
            image: book.image ?? '',
          },
        }}
        schema={updateBookInputSchema}
      >
        {({ register, formState }) => (
          <>
            <Input
              label="Title"
              error={formState.errors['title']}
              registration={register('title')}
            />
            <Input
              label="Author"
              error={formState.errors['author']}
              registration={register('author')}
            />
            <Input
              label="Genre"
              error={formState.errors['genre']}
              registration={register('genre')}
            />
            <Input
              label="Price"
              type="number"
              step="0.01"
              error={formState.errors['price']}
              registration={register('price', { valueAsNumber: true })}
            />
            <Input
              label="Stock"
              type="number"
              error={formState.errors['stock']}
              registration={register('stock', { valueAsNumber: true })}
            />
            <Input
              label="Image URL"
              error={formState.errors['image']}
              registration={register('image')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
