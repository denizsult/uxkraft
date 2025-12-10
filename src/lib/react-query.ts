import {
  type DefaultOptions,
  QueryClient,
  type QueryFunctionContext,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

// if query options has refetch queries, then add them to onSuccess of mutation options

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  },
};

type CustomMutationParameters = {
  refetchQueries?: readonly string[];
  responseTransformer?: (data: any) => any;
  requestTransformer?: (data: any) => any;
  messageType?: "message" | "notification";
  onSuccessMessage?: string;
  onErrorMessage?: string;
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>;

type CustomQueryParameters = {
  queryKey?: QueryKey;
  queryFn?: (...args: any) => any;
};
export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryKey" | "queryFn"
> &
  CustomQueryParameters;
export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  > &
    CustomMutationParameters;

export type QueryContext<
  keys extends { [K: string]: QueryKey | ((...params: any[]) => QueryKey) },
  mode extends keyof keys
> = keys[mode] extends (...params: any[]) => QueryKey
  ? QueryFunctionContext<ReturnType<keys[mode]>>
  : keys[mode] extends QueryKey
  ? QueryFunctionContext<keys[mode]>
  : never;