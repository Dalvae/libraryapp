import { useState } from "react";
import Book from types 

export const BookCard = ({ book :Book }) => {
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <div
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <img src={book.image} alt={book.title} className="w-32 h-48 object-cover" />
          <h3 className="font-bold">{book.title}</h3>
          <p>{book.author}</p>
        </div>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{book.title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
              {/* Mostrar información detallada del libro */}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };