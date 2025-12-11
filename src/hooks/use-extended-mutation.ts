/* eslint-disable @typescript-eslint/no-explicit-any */

import type { MutationConfig } from "@/lib/react-query";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";

export const useExtendedMutation = <
  MutationFnType extends (...args: any) => any
>(
  config?: MutationConfig<MutationFnType>
) => {
  const { refetchQueries, onSuccess, onSuccessMessage, onErrorMessage, onError, ...restConfig } =
    config || {};

  const mutation = useMutation({
    ...restConfig,

    onSuccess: async (data, variables, onMutateResult, context) => {
      await onSuccess?.(data, variables, onMutateResult, context);

      if (refetchQueries?.length) {
        await Promise.all(
          refetchQueries.map((queryKey) =>
            queryClient.refetchQueries({
              queryKey: [queryKey],
            })
          )
        );
      }

      if (onSuccessMessage) {
        toast.success(onSuccessMessage);
      }


    },
    onError: (error, variables, onMutateResult, context) => {
      if (onErrorMessage) {
        toast.error(onErrorMessage);
      }

      return onError?.(error, variables, onMutateResult, context);
    },
  });

  return mutation;
};
