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
  poApprovalDate?: string;
  hotelNeedByDate?: string;
  expectedDelivery?: string;
} & BaseEntity;



export type PlanningRequirementsFormValues = {
  poApprovalDate: Date | null;
  hotelNeedByDate: Date | null;
  expectedDelivery: Date | null;
};