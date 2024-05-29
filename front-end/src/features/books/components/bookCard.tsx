import { useState, FC } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalBody,
} from '@/components/ui/modal/modal';
import { Book } from '@/types/api';
import { Button } from '@/components/ui/button';

type BookCardProps = {
  book: Book;
};

export const BookCard: FC<BookCardProps> = ({ book }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="cursor-pointer bg-white rounded-lg shadow-md p-4 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        onClick={() => setOpen(true)}
      >
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-56 object-cover rounded-md mb-4"
        />
        <h3 className="font-bold text-lg mb-2">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent className="w-11/12 max-w-2xl">
          <ModalHeader>
            <div className="flex justify-center">
              <img
                src={book.image}
                alt={book.title}
                className="w-48 h-72 object-cover rounded-md"
              />
            </div>
            <ModalTitle className="text-center mt-4">
              {book.title} - {book.author}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="max-h-60 overflow-y-auto">
              <p>{book.description}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-end">
              <Button onClick={() => setOpen(false)}>Cerrar</Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
