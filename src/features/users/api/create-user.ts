import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';

import type { User } from '../types';

export type CreateUserDTO = {
  name: string;
  email: string;
  role: string;
};

export const createUser = (data: CreateUserDTO): Promise<User> => {
  return api.post('/users', data);
};

type UseCreateUserOptions = {
  mutationConfig?: MutationConfig<typeof createUser>;
};

export const useCreateUser = ({ mutationConfig }: UseCreateUserOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    ...mutationConfig,
    mutationFn: createUser,
  });
};

