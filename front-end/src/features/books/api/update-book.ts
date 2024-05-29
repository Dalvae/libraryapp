import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { inventoryApi } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { getBooksQueryOptions } from './get-books';

export const updateBookInputSchema = z.object({
  title: z.string().min(1, 'Required'),
  author: z.string().min(1, 'Required'),
  genre: z.string().min(1, 'Required'),
  price: z.number().min(0, 'Price must be greater than or equal to 0'),
  stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
  image: z.string().optional(),
  description: z.string().optional().nullable(),
});

export type UpdateBookInput = z.infer<typeof updateBookInputSchema>;

export const updateBook = ({
  id,
  ...data
}: UpdateBookInput & { id: string }) => {
  return inventoryApi.patch(`/books/${id}`, data);
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
      console.log('Mutation successful', ...args);
      queryClient.invalidateQueries({
        queryKey: getBooksQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateBook,
  });
};

export type UpdateBookStockInput = {
  id: string;
  stock: number;
};

export const updateBookStock = ({ id, stock }: UpdateBookStockInput) => {
  return inventoryApi.patch(`/books/${id}`, { stock });
};

type UseUpdateBookStockOptions = {
  mutationConfig?: MutationConfig<typeof updateBookStock>;
};

export const useUpdateBookStock = ({
  mutationConfig,
}: UseUpdateBookStockOptions = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      console.log('Stock update successful', ...args);
      queryClient.invalidateQueries({
        queryKey: getBooksQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateBookStock,
  });
};
