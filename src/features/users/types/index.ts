import type { BaseEntity } from '@/types';

export type User = {
  name: string;
  email: string;
  role: string;
  avatar?: string;
} & BaseEntity;

