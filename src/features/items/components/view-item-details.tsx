import { HeaderSection } from "./sections/HeaderSection";
import { ItemDetailsSection } from "./sections/ItemDetailsSection";
import { PlanningRequirementsSection } from "./sections/PlanningRequirementsSection";
import { ProductionShopSection } from "./sections/ProductionShopSection";
import { ShippingSection } from "./sections/ShippingSection";
import { SheetContainer } from "@/components/sheet-layout";
import type { Item } from "../types";

type ViewItemDetailsProps = {
  item: Item;
  onClose: () => void;
};

export const ViewItemDetails = ({ item, onClose }: ViewItemDetailsProps) => {
  return (
    <SheetContainer>
      <HeaderSection item={item} onClose={onClose} />
      <div className="flex flex-col items-start gap-4 p-6 relative self-stretch w-full">
        <ProductionShopSection item={item} />
        <ShippingSection item={item} />
        <PlanningRequirementsSection />
        <ItemDetailsSection item={item} />
      </div>
    </SheetContainer>
  );
};
