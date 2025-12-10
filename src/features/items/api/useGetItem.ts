import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { QueryConfig } from "@/lib/react-query";
import type { Item } from "@/types/item";

export const getItem = async (id: string): Promise<Item> => {
  return (await api.get<Item>(`/items/${id}`)).data;
};

export const useGetItem = (id: string, config?: QueryConfig<typeof getItem>) => {
  return useQuery<Item>({
    queryKey: ["useGetItem", id],
    queryFn: () => getItem(id),
    ...config,
  });
};
