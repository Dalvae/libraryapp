// Pagination.tsx
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center ml-2">
      <Button
        variant="outline"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className="mr-2"
        size="icon"
      >
        <ArrowLeft size={16} />
      </Button>
      <span className="border rounded border-input bg-background shadow-sm py-1 px-4">
        {currentPage}
      </span>
      <Button
        variant="outline"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className="ml-2"
        size="icon"
      >
        <ArrowRight size={16} />
      </Button>
    </div>
  );
};
