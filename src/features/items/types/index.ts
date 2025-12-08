import type { BaseEntity } from '@/types';

export type Item = {
  itemNumber: string;
  specNumber: string;
  itemName: string;
  vendor: string;
  shipTo: string;
  qty: number;
  phase: string;
  price: number;
  shipNotes: string;
} & BaseEntity;

