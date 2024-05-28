import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';
import { getBooksQueryOptions } from '@/features/books/api/get-books'; // Import getBooksQueryOptions
import { BooksList } from '@/features/books/components/book-list';

export const booksLoader = (queryClient: QueryClient) => async () => {
  const query = getBooksQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const BooksRoute = () => {
  return (
    <ContentLayout title="Libros">
      <BooksList />
    </ContentLayout>
  );
};
