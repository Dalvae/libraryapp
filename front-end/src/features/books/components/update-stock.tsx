// update-stock.tsx

import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUpdateBook } from '../api/update-book';

type UpdateStockProps = {
  book: {
    id: string;
    title: string;
    author: string;
    genre: string;
    price: number;
    stock: number;
    image?: string;
  };
};

export const UpdateStock = ({ book }: UpdateStockProps) => {
  const updateBookMutation = useUpdateBook();

  const handleIncreaseStock = () => {
    updateBookMutation.mutate({
      ...book,
      stock: book.stock + 1,
    });
  };

  const handleDecreaseStock = () => {
    if (book.stock > 0) {
      updateBookMutation.mutate({
        ...book,
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
