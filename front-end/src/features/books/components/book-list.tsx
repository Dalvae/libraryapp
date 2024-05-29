import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';
import { DeleteBook } from './delete-book';
import { useBooks } from '../api/get-books';
import { AddBook } from './addBook';
import { UpdateStock } from './update-stock';
import { SearchBooks } from './search-book';
import { SortBooks } from './sortBooks';
import { ChangeView } from './changeView';

export const BooksList = () => {
  const booksQuery = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState<'id' | 'lastEdited'>('id');
  const [view, setView] = useState<'table' | 'cards'>('table');

  if (booksQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!booksQuery.data) return null;

  const filteredBooks = booksQuery.data
    .filter((book) =>
      [book.title, book.author, book.genre].some((field) =>
        field.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
    .sort((a, b) => {
      if (sortCriteria === 'id') {
        return parseInt(a.id) - parseInt(b.id);
      } else {
        return (
          new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime()
        );
      }
    });

  return (
    <>
      <div className="flex flex-row w-full align-baseline items-center mb-4  ">
        <SearchBooks onSearch={setSearchQuery} />
        <SortBooks onSortChange={setSortCriteria} sortCriteria={sortCriteria} />
        <ChangeView view={view} onViewChange={setView} />
        <AddBook />
      </div>
      {view === 'table' ? (
        <Table
          data={filteredBooks}
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
              title: 'Género',
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
              Cell({ entry }) {
                return <UpdateStock book={entry} />;
              },
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
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {/* {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))} */}
        </div>
      )}
    </>
  );
};
