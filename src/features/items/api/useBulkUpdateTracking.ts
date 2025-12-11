import { useExtendedMutation } from "@/hooks/use-extended-mutation";
import { api } from "@/lib/axios";
import type { MutationConfig } from "@/lib/react-query";
import type { Item } from "@/types/item";

type UpdatePlanningDto = {
  po_approval_date?: string | null;
  hotel_need_by_date?: string | null;
  expected_delivery?: string | null;
};

export type BulkUpdateTrackingDto = {
  item_ids: number[];
  planning?: UpdatePlanningDto;
  production?: {
    cfa_shops_send?: string | null;
    cfa_shops_approved?: string | null;
    cfa_shops_delivered?: string | null;
  };
  shipping?: {
    ordered_date?: string | null;
    shipped_date?: string | null;
    delivered_date?: string | null;
    shipping_notes?: string | null;
  };
  item_notes?: string | null;
  ship_from?: string | null;
};

export const bulkUpdateTracking = async (
  data: BulkUpdateTrackingDto
): Promise<Item[]> => {
  return (await api.patch<Item[]>("/items/bulk/update-tracking", data)).data;
};

export const useBulkUpdateTracking = (
  config?: MutationConfig<typeof bulkUpdateTracking>
) => {
  return useExtendedMutation({
    ...config,
    mutationFn: bulkUpdateTracking,
  });
};
