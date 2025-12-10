import { useExtendedMutation } from "@/hooks/use-extended-mutation";
import { api } from "@/lib/axios";
import type { MutationConfig } from "@/lib/react-query";
import type { Item } from "@/types/item";

export type UpdateShippingDto = {
  ordered_date?: string | null;
  shipped_date?: string | null;
  delivered_date?: string | null;
  shipping_notes?: string | null;
};

type UpdateShippingParams = { id: string; data: UpdateShippingDto };

export const updateShipping = async ({
  id,
  data,
}: UpdateShippingParams): Promise<Item> => {
  return (await api.post<Item>(`/items/${id}/shipping`, data)).data;
};

export const useUpdateShipping = (
  config?: MutationConfig<typeof updateShipping>
) => {
  return useExtendedMutation({
    ...config,
    mutationFn: updateShipping,
  });
};
