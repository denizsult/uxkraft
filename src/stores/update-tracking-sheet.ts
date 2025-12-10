import { create } from 'zustand';

import type { Item } from '@/types/item';

type UpdateTrackingSheetState = {
  isOpen: boolean;
  selectedItems: Item[];
  open: (items: Item[]) => void;
  close: () => void;
};

export const useUpdateTrackingSheet = create<UpdateTrackingSheetState>((set) => ({
  isOpen: false,
  selectedItems: [],
  open: (items) => set({ isOpen: true, selectedItems: items }),
  close: () => set({ isOpen: false, selectedItems: [] }),
}));

