import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { Item, PaginatedResponse, QueryItemsDto } from '../types';

export const getItems = async (params?: QueryItemsDto): Promise<PaginatedResponse<Item>> => {
  const response = await api.get<PaginatedResponse<Item>>('/items', { params });
  return response.data;
};

export const getItem = async (id: string): Promise<Item> => {
  const response = await api.get<Item>(`/items/${id}`);
  return response.data;
};

type UseItemsOptions = {
  params?: QueryItemsDto;
};

export const useItems = ({ params }: UseItemsOptions = {}) => {
  return useQuery({
    queryKey: ['items', params],
    queryFn: () => getItems(params),
  });
};

export const useItem = (id: string) => {
  return useQuery({
    queryKey: ['items', id],
    queryFn: () => getItem(id),
    enabled: !!id,
  });
};

