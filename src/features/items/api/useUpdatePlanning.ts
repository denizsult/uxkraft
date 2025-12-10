import { useExtendedMutation } from "@/hooks/use-extended-mutation";
import { api } from "@/lib/axios";
import type { MutationConfig } from "@/lib/react-query";
import type { Item } from "@/types/item";

export type UpdatePlanningDto = {
  po_approval_date?: string | null;
  hotel_need_by_date?: string | null;
  expected_delivery?: string | null;
};

type UpdatePlanningParams = { id: string; data: UpdatePlanningDto };

export const updatePlanning = async ({
  id,
  data,
}: UpdatePlanningParams): Promise<Item> => {
  return (await api.post<Item>(`/items/${id}/planning-requirements`, data))
    .data;
};

export const useUpdatePlanning = (
  config?: MutationConfig<typeof updatePlanning>
) => {
  return useExtendedMutation({
    ...config,
    mutationFn: updatePlanning,
  });
};
