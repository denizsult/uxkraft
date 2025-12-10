
import { SheetHeader } from "@/components/sheet-layout";
import type { Item } from "@/types/item";

type HeaderSectionProps = {
  item: Item;
  onClose: () => void;
};

export const HeaderSection = ({ item, onClose }: HeaderSectionProps) => {
  return (
    <SheetHeader
      title={`Item #${item.id} - ${item.item_name}`}
      onClose={onClose}
      actionButton={
        <button className="font-semibold text-content text-sm  leading-5 underline whitespace-nowrap bg-transparent border-none cursor-pointer">
          Edit
        </button>
      }
    />
  );
};

