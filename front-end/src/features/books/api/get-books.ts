import { queryOptions, useQuery } from '@tanstack/react-query';
import { inventoryApi } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Book } from '@/types/api';

export const getBooks = (): Promise<Book[]> => {
  return inventoryApi.get(`/books`);
};

export const getBooksQueryOptions = () => {
  return queryOptions({
    queryKey: ['books'],
    queryFn: getBooks,
  });
};

type UseBooksOptions = {
  queryConfig?: QueryConfig<typeof getBooksQueryOptions>;
};

export const useBooks = ({ queryConfig }: UseBooksOptions = {}) => {
  return useQuery({
    ...getBooksQueryOptions(),
    ...queryConfig,
  });
};
