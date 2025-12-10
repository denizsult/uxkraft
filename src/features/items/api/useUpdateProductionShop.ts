import { useExtendedMutation } from "@/hooks/use-extended-mutation";
import { api } from "@/lib/axios";
import type { MutationConfig } from "@/lib/react-query";
import type { Item } from "@/types/item";

export type UpdateProductionShopDto = {
  cfa_shops_send?: string | null;
  cfa_shops_approved?: string | null;
  cfa_shops_delivered?: string | null;
};

type UpdateProductionShopParams = { id: string; data: UpdateProductionShopDto };

export const updateProductionShop = async ({
  id,
  data,
}: UpdateProductionShopParams): Promise<Item> => {
  return (await api.post<Item>(`/items/${id}/production-shop`, data)).data;
};

export const useUpdateProductionShop = (
  config?: MutationConfig<typeof updateProductionShop>
) => {
  return useExtendedMutation({
    ...config,
    mutationFn: updateProductionShop,
  });
};
