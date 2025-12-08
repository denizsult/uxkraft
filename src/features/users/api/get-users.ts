import { useQuery, type QueryKey } from '@tanstack/react-query';

import { api } from '@/lib/axios';

import type { User } from '../types';

export const getUsers = (): Promise<{ data: User[] }> => {
  return api.get('/users');
};

type UseUsersOptions = {
  queryKey?: QueryKey;
};

export const useUsers = ({ queryKey = ['users'] }: UseUsersOptions = {}) => {
  return useQuery({
    queryKey,
    queryFn: () => getUsers(),
  });
};

