import { useState } from 'react';
import { Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
} from '@/components/ui/modal/modal';
import { Form, Input, Label, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import {
  updateBookInputSchema,
  useUpdateBook,
  UpdateBookInput,
} from '../api/update-book';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Book } from '@/types/api';

type UpdateBookProps = {
  book: Book;
};

export const UpdateBook = ({ book }: UpdateBookProps) => {
  const [open, setOpen] = useState(false);
  const { addNotification } = useNotifications();

  const updateBookMutation = useUpdateBook({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Libro actualizado',
        });
        setOpen(false); // Cerrar el modal en caso de éxito
      },
      onError: (error) => {
        console.error('Error updating book:', error);
        addNotification({
          type: 'error',
          title: 'Error al actualizar el libro',
        });
      },
    },
  });

  const handleSubmit = (data: UpdateBookInput) => {
    console.log('Submitting data:', data);
    const updatedData = { ...data, id: book.id };
    console.log('Updated data:', updatedData);
    updateBookMutation.mutate(updatedData);
  };

  return (
    <>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={() => setOpen(true)} size="sm" className="">
              <Pen className="w-3 h-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-sm text-gray-700 p-2 rounded shadow m-2">
            Editar Libro
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent className="w-11/12 max-w-2xl">
          <ModalHeader>
            <ModalTitle>Modificar Libro</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={handleSubmit}
              schema={updateBookInputSchema}
              options={{
                defaultValues: {
                  id: book.id,
                  title: book.title,
                  author: book.author,
                  genre: book.genre,
                  price: book.price,
                  stock: book.stock,
                  image: book.image ?? '',
                  description: book.description ?? '',
                },
              }}
            >
              {({ register, formState }) => (
                <>
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Input id="title" registration={register('title')} />
                    {formState.errors.title && (
                      <span className="error">
                        {formState.errors.title.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="author">Autor</Label>
                    <Input id="author" registration={register('author')} />
                    {formState.errors.author && (
                      <span className="error">
                        {formState.errors.author.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="genre">Género</Label>
                    <Input id="genre" registration={register('genre')} />
                    {formState.errors.genre && (
                      <span className="error">
                        {formState.errors.genre.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="price">Precio</Label>
                    <Input
                      id="price"
                      type="number"
                      registration={register('price', { valueAsNumber: true })}
                    />
                    {formState.errors.price && (
                      <span className="error">
                        {formState.errors.price.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      registration={register('stock', { valueAsNumber: true })}
                    />
                    {formState.errors.stock && (
                      <span className="error">
                        {formState.errors.stock.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      registration={register('description')}
                    />
                    {formState.errors.description && (
                      <span className="error">
                        {formState.errors.description.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="image">Imagen</Label>
                    <Input id="image" registration={register('image')} />
                    {formState.errors.image && (
                      <span className="error">
                        {formState.errors.image.message}
                      </span>
                    )}
                  </div>
                  <Button
                    type="submit"
                    isLoading={updateBookMutation.isPending}
                  >
                    Actualizar libro
                  </Button>
                </>
              )}
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
