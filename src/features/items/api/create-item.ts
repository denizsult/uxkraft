import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';

import type { 
  Item, 
  CreateItemDto, 
  UpdateItemDto, 
  UpdatePlanningDto,
  BulkUpdateItemsDto,
  BulkUpdateTrackingDto,
} from '../types';

export const createItem = async (data: CreateItemDto): Promise<Item> => {
  const response = await api.post<Item>('/items', data);
  return response.data;
};

export const updateItem = async (id: string, data: UpdateItemDto): Promise<Item> => {
  const response = await api.patch<Item>(`/items/${id}`, data);
  return response.data;
};

export const updatePlanning = async (id: string, data: UpdatePlanningDto): Promise<Item> => {
  const response = await api.patch<Item>(`/items/${id}/planning-requirements`, data);
  return response.data;
};

export const bulkUpdateItems = async (data: BulkUpdateItemsDto): Promise<any> => {
  const response = await api.patch('/items/bulk', data);
  return response.data;
};

export const bulkUpdateTracking = async (data: BulkUpdateTrackingDto): Promise<any> => {
  const response = await api.patch('/items/bulk/update-tracking', data);
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
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

export const useUpdateItem = ({ mutationConfig }: { mutationConfig?: MutationConfig<typeof updateItem> } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    ...mutationConfig,
    mutationFn: ({ id, data }: { id: string; data: UpdateItemDto }) => updateItem(id, data),
  });
};

export const useUpdatePlanning = ({ mutationConfig }: { mutationConfig?: MutationConfig<typeof updatePlanning> } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    ...mutationConfig,
    mutationFn: ({ id, data }: { id: string; data: UpdatePlanningDto }) => updatePlanning(id, data),
  });
};

export const useBulkUpdateItems = ({ mutationConfig }: { mutationConfig?: MutationConfig<typeof bulkUpdateItems> } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    ...mutationConfig,
    mutationFn: bulkUpdateItems,
  });
};

export const useBulkUpdateTracking = ({ mutationConfig }: { mutationConfig?: MutationConfig<typeof bulkUpdateTracking> } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    ...mutationConfig,
    mutationFn: bulkUpdateTracking,
  });
};

export const useDeleteItem = ({ mutationConfig }: { mutationConfig?: MutationConfig<typeof deleteItem> } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
    ...mutationConfig,
    mutationFn: deleteItem,
  });
};
