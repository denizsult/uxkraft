import { useQuery, type QueryKey } from '@tanstack/react-query';

import type { Item } from '../types';
import { mockItems } from './mock-items';

export const getItems = (): Promise<{ data: Item[] }> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: mockItems });
    }, 500);
  });
};

type UseItemsOptions = {
  queryKey?: QueryKey;
};

export const useItems = ({ queryKey = ['items'] }: UseItemsOptions = {}) => {
  return useQuery({
    queryKey,
    queryFn: () => getItems(),
  });
};

