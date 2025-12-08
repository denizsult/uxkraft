import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';

import type { Item } from '../types';

export type CreateItemDTO = {
  itemNumber: string;
  specNumber: string;
  itemName: string;
  vendor: string;
  shipTo: string;
  qty: number;
  phase: string;
  price: number;
  shipNotes: string;
};

export const createItem = (data: CreateItemDTO): Promise<Item> => {
  return api.post('/items', data);
};

type UseCreateItemOptions = {
  mutationConfig?: MutationConfig<typeof createItem>;
};

export const useCreateItem = ({ mutationConfig }: UseCreateItemOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    ...mutationConfig,
    mutationFn: createItem,
  });
};

