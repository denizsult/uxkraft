import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { useItemDetailSheet } from "@/stores/item-detail-sheet";
import { ViewItemDetails } from "./view-item-details";
 

export const ItemDetailSheet = () => {
  const { isOpen, item, close } = useItemDetailSheet();

  const handleClose = (open: boolean) => {
    if (!open) {
      close();
    }
  };

  if (!item) return null;

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto p-0 bg-sheet-bg"
      >
        <ViewItemDetails item={item} onClose={close} />
      </SheetContent>
    </Sheet>
  );
};
