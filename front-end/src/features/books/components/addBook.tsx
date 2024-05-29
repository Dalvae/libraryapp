// AddBook.tsx

import { useState } from 'react';
import { BookPlus } from 'lucide-react';
import { useNotifications } from '@/components/ui/notifications';
import { Button } from '@/components/ui/button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalBody,
} from '@/components/ui/modal/modal';
import { Form, Input, Label, Textarea } from '@/components/ui/form';
import { useAddBook, addBookInputSchema, AddBookInput } from '../api/add-book';

export const AddBook = () => {
  const [open, setOpen] = useState(false);
  const { addNotification } = useNotifications();

  const addBookMutation = useAddBook({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Libro añadido',
        });
        setOpen(false);
      },
    },
  });

  const handleSubmit = (data: AddBookInput) => {
    addBookMutation.mutate(data);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        icon={<BookPlus className="w-4 h-4" />}
        className=" p-2 mx-4"
      >
        Añadir Libro
      </Button>
      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Añadir Libro</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit} schema={addBookInputSchema}>
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
                    <Label htmlFor="genre">Genero</Label>
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
                  <Button type="submit" isLoading={addBookMutation.isPending}>
                    Añadir libro
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
