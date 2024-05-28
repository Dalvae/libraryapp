// add-book.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { inventoryApi } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { getBooksQueryOptions } from './get-books';

export const addBookInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  author: z.string().min(1, 'Required'),
  genre: z.string().min(1, 'Required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
  image: z.string().optional(),
});

export type AddBookInput = z.infer<typeof addBookInputSchema>;

export const addBook = (data: AddBookInput) => {
  return inventoryApi.post(`/books/`, data);
};

type UseAddBookOptions = {
  mutationConfig?: MutationConfig<typeof addBook>;
};

export const useAddBook = ({ mutationConfig }: UseAddBookOptions = {}) => {
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
    mutationFn: addBook,
  });
};
