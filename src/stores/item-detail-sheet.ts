import { create } from 'zustand';

import type { Item } from '@/features/items/types';

type ItemDetailSheetState = {
  isOpen: boolean;
  item: Item | null;
  open: (item: Item) => void;
  close: () => void;
};

export const useItemDetailSheet = create<ItemDetailSheetState>((set) => ({
  isOpen: false,
  item: null,
  open: (item) => set({ isOpen: true, item }),
  close: () => set({ isOpen: false, item: null }),
}));

