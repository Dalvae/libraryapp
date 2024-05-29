import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
import { BookCard } from './bookCard';
import { UpdateBook } from './updateBook';
import { Pagination } from './pagination';

export const BooksList = () => {
  const booksQuery = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState<'id' | 'lastEdited'>('id');
  const [view, setView] = useState<'table' | 'cards'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex flex-row w-full align-baseline items-center mb-4  ">
        <SearchBooks onSearch={setSearchQuery} />
        <SortBooks onSortChange={setSortCriteria} sortCriteria={sortCriteria} />
        <ChangeView view={view} onViewChange={setView} />
        <Pagination
          currentPage={currentPage}
          totalItems={filteredBooks.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        <AddBook />
      </div>
      {view === 'table' ? (
        <Table
          data={currentItems}
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
              Cell({ entry: book }) {
                return <UpdateBook book={book} />;
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
          {currentItems.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </>
  );
};
