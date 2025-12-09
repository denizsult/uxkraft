import { create } from 'zustand';

import type { Item } from '@/features/items/types';

type BulkEditSheetState = {
  isOpen: boolean;
  selectedItems: Item[];
  open: (items: Item[]) => void;
  close: () => void;
};

export const useBulkEditSheet = create<BulkEditSheetState>((set) => ({
  isOpen: false,
  selectedItems: [],
  open: (items) => set({ isOpen: true, selectedItems: items }),
  close: () => set({ isOpen: false, selectedItems: [] }),
}));
