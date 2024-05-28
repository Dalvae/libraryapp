import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';
import { DeleteBook } from './delete-book';
import { useBooks } from '../api/get-books';

export const BooksList = () => {
  const booksQuery = useBooks();

  if (booksQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!booksQuery.data) return null;

  return (
    <Table
      data={booksQuery.data}
      columns={[
        {
          title: 'Título',
          field: 'title',
        },
        {
          title: 'Autor',
          field: 'author',
        },
        {
          title: 'Genero',
          field: 'genre',
        },
        {
          title: 'Precio',
          field: 'price',
          Cell({ entry: { price } }) {
            const formattedPrice =
              typeof price === 'number' ? price.toFixed(2) : price;
            return <span>${formattedPrice}</span>;
          },
        },
        {
          title: 'Stock',
          field: 'stock',
        },
        {
          title: 'Creado',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteBook id={id} />;
          },
        },
      ]}
    />
  );
};
