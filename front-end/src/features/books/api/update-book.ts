import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { inventoryApi } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { getBooksQueryOptions } from './get-books';

export const updateBookInputSchema = z.object({
  id: z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  author: z.string().min(1, 'Required'),
  genre: z.string().min(1, 'Required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
  image: z.string().optional(),
});

export type UpdateBookInput = z.infer<typeof updateBookInputSchema>;

export const updateBook = ({
  id,
  title,
  author,
  genre,
  price,
  stock,
  image,
}: UpdateBookInput) => {
  return inventoryApi.put(`/books/${id}`, {
    title,
    author,
    genre,
    price,
    stock,
    image,
  });
};

type UseUpdateBookOptions = {
  mutationConfig?: MutationConfig<typeof updateBook>;
};

export const useUpdateBook = ({
  mutationConfig,
}: UseUpdateBookOptions = {}) => {
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
    mutationFn: updateBook,
  });
};
