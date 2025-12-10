import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import type { QueryConfig } from "@/lib/react-query";
import type { Item } from "@/types/item";

export const getItems = async (): Promise<Item[]> => {
  return (await api.get<Item[]>("/items")).data;
};

export const useGetItems = (config?: QueryConfig<typeof getItems>) => {
  return useQuery<Item[]>({
    queryKey: ["useGetItems"],
    queryFn: getItems,
    ...config,
  });
};
