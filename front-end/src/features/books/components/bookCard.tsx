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
import { UpdateBook } from './updateBook';

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
            <div className="flex justify-between items-center mt-4">
              <ModalTitle>
                {book.title} - {book.author}
              </ModalTitle>
              <span className="text-sm text-gray-500">{book.genre}</span>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="max-h-60 overflow-y-auto">
              <p>{book.description}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-between items-center w-full">
              <div>
                <p className="text-lg font-bold">Precio: ${book.price}</p>
                <p className="text-sm text-gray-500">Stock: {book.stock}</p>
              </div>
              <div className=" flex items-center align-baseline gap-4">
                <UpdateBook book={book} />
                <Button
                  size="sm"
                  className="p-0"
                  onClick={() => setOpen(false)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
