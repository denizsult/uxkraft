import { useExtendedMutation } from "@/hooks/use-extended-mutation";
import { api } from "@/lib/axios";
import type { MutationConfig } from "@/lib/react-query";
import type { Item } from "@/types/item";

export type BulkUpdateItemsDto = {
  item_ids: number[];
  location?: string;
  category?: string;
  ship_from?: string;
  ship_notes?: string;
};

export const bulkUpdateItems = async (data: BulkUpdateItemsDto): Promise<Item[]> => {
  return (await api.patch<Item[]>('/items/bulk', data)).data;
};

export const useBulkUpdateItems = (config?: MutationConfig<typeof bulkUpdateItems>) => {
  return useExtendedMutation({
    ...config,
    mutationFn: bulkUpdateItems,
   });
};
