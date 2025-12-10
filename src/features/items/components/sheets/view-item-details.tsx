import { HeaderSection } from "../sections/HeaderSection";
import { ShippingSection } from "../sections/ShippingSection";

import { SheetContainer } from "@/components/sheet-layout";
import type { Item } from "@/types/item";
import {
  useUpdatePlanning,
  useUpdateProductionShop,
  type UpdatePlanningDto,
  type UpdateProductionShopDto,
  type UpdateShippingDto,
} from "../../api";
import { useUpdateShipping } from "../../api";
import {
  ItemDetailsSection,
  PlanningRequirementsSection,
  ProductionShopSection,
} from "../sections";

type ViewItemDetailsProps = {
  item: Item;
  onClose: () => void;
};

export const ViewItemDetails = ({ item, onClose }: ViewItemDetailsProps) => {
  const { mutateAsync: updateProductionShop } = useUpdateProductionShop({
    refetchQueries: ["useGetItems"],
    onSuccessMessage: "Production shop updated successfully",
    onErrorMessage: "Failed to update production shop",
  });
  const { mutateAsync: updateShipping } = useUpdateShipping({
    refetchQueries: ["useGetItems"],
    onSuccessMessage: "Shipping updated successfully",
    onErrorMessage: "Failed to update shipping",
  });
  const { mutateAsync: updatePlanning } = useUpdatePlanning({
    refetchQueries: ["useGetItems"],
    onSuccessMessage: "Planning updated successfully",
    onErrorMessage: "Failed to update planning",
  });

  const handleUpdateProductionShop = async (data: UpdateProductionShopDto) => {
    await updateProductionShop({ id: item.id, data });
  };
  const handleUpdatePlanning = async (data: UpdatePlanningDto) => {
    await updatePlanning({ id: item.id, data });
  };

  const handleUpdateShipping = async (data: UpdateShippingDto) => {
    await updateShipping({ id: item.id, data });
  };

  return (
    <SheetContainer>
      <HeaderSection item={item} onClose={onClose} />
      <div className="flex flex-col items-start gap-4 p-6 relative self-stretch w-full">
        <ItemDetailsSection item={item} />

        <PlanningRequirementsSection
          poApprovalDate={item.planning?.po_approval_date}
          hotelNeedByDate={item.planning?.hotel_need_by_date}
          expectedDelivery={item.planning?.expected_delivery}
          onFieldChange={(field, value) => {
            handleUpdatePlanning({ [field]: value });
          }}
        />
        <ProductionShopSection
          cfaShopsSend={item.production?.cfa_shops_send}
          cfaShopsApproved={item.production?.cfa_shops_approved}
          cfaShopsDelivered={item.production?.cfa_shops_delivered}
          onFieldChange={(field, value) => {
            handleUpdateProductionShop({ [field]: value });
          }}
        />

        <ShippingSection
          orderedDate={item.shipping?.ordered_date}
          shippedDate={item.shipping?.shipped_date}
          deliveredDate={item.shipping?.delivered_date}
          shippingNotes={item.shipping?.shipping_notes}
          onFieldChange={(field, value) => {
            handleUpdateShipping({ [field]: value });
          }}
        />
      </div>
    </SheetContainer>
  );
};
