import React from "react";
import { SheetHeader } from "@/components/sheet-layout";
import type { Item } from "../../types";

type HeaderSectionProps = {
  item: Item;
  onClose: () => void;
};

export const HeaderSection = ({ item, onClose }: HeaderSectionProps) => {
  return (
    <SheetHeader
      title={`Item #${item.item_number} - ${item.item_name}`}
      onClose={onClose}
      actionButton={
        <button className="font-semibold text-content text-sm  leading-5 underline whitespace-nowrap bg-transparent border-none cursor-pointer">
          Edit
        </button>
      }
    />
  );
};

