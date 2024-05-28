import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { getBooksQueryOptions } from './get-books';

export type DeleteBookDTO = {
  bookId: string;
};

export const deleteBook = ({ bookId }: DeleteBookDTO) => {
  return inventoryApi.delete(`/books/${bookId}`);
};

type UseDeleteBookOptions = {
  mutationConfig?: MutationConfig<typeof deleteBook>;
};

export const useDeleteBook = ({
  mutationConfig,
}: UseDeleteBookOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getBooksQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteBook,
  });
};
