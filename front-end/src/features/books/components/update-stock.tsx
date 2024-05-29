// update-stock.tsx

import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UpdateBookStockInput, useUpdateBookStock } from '../api/update-book';
import { Book } from '@/types/api';

type UpdateStockProps = {
  book: Book;
};

export const UpdateStock = ({ book }: UpdateStockProps) => {
  const updateBookStockMutation = useUpdateBookStock();

  const handleIncreaseStock = () => {
    updateBookStockMutation.mutate({
      id: book.id,
      stock: book.stock + 1,
    });
  };

  const handleDecreaseStock = () => {
    if (book.stock > 0) {
      updateBookStockMutation.mutate({
        id: book.id,
        stock: book.stock - 1,
      });
    }
  };

  return (
    <div className="flex items-center">
      <Button
        onClick={handleDecreaseStock}
        disabled={book.stock === 0}
        className="p-0"
      >
        <Minus className="w-4 h-4" />
      </Button>
      <span className="mx-2">{book.stock}</span>

      <Button onClick={handleIncreaseStock} className="p-0">
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};
