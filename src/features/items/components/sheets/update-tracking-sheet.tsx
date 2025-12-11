import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useUpdateTrackingSheet } from "@/stores/update-tracking-sheet";
import { useForm } from "react-hook-form";
import {
  SheetHeader,
  SheetFooter,
  SheetContainer,
} from "@/components/sheet-layout";
import {
  PlanningRequirementsSection,
  ProductionShopSection,
} from "../sections";
import { useBulkUpdateTracking } from "../../api";
import { ShippingSection } from "../sections/ShippingSection";

type UpdateTrackingFormValues = {
  shipping: {
    ordered_date: Date | undefined;
    shipped_date: Date | undefined;
    delivered_date: Date | undefined;
    shipping_notes: string | undefined;
  };
  production: {
    cfa_shops_send: Date | undefined;
    cfa_shops_approved: Date | undefined;
    cfa_shops_delivered: Date | undefined;
  };
  planning: {
    po_approval_date: Date | undefined;
    hotel_need_by_date: Date | undefined;
    expected_delivery: Date | undefined;
  };
};

const defaultValues: UpdateTrackingFormValues = {
  shipping: {
    ordered_date: undefined,
    shipped_date: undefined,
    delivered_date: undefined,
    shipping_notes: undefined,
  },
  production: {
    cfa_shops_send: undefined,
    cfa_shops_approved: undefined,
    cfa_shops_delivered: undefined,
  },
  planning: {
    po_approval_date: undefined,
    hotel_need_by_date: undefined,
    expected_delivery: undefined,
  },
};
export const UpdateTrackingSheet = () => {
  const { isOpen, close, selectedItems } = useUpdateTrackingSheet();

  const {
    mutateAsync: bulkUpdateTrackingMutation,
    isPending: isBulkUpdateTrackingPending,
  } = useBulkUpdateTracking({
    refetchQueries: ["useGetItems"],
    onSuccessMessage: "Tracking updated successfully",
    onErrorMessage: "Failed to update tracking",
    onSuccess: () => {
      handleClose();
    },
  });

  const {
    setValue,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm<UpdateTrackingFormValues>({
    defaultValues,
  });

  const formValues = getValues();

  const handleSave = async () => {
    const formValues = getValues();
    await bulkUpdateTrackingMutation({
      item_ids: selectedItems.map((item) => item.id),
      planning: formValues.planning,
      production: formValues.production,
      shipping: formValues.shipping,
    });
  };

  const handlePlanningChange = (
    field: keyof UpdateTrackingFormValues["planning"],
    value: string
  ) => {
    setValue("planning", {
      ...getValues("planning"),
      [field]: value ? new Date(value) : null,
    });
  };

  const handleProductionChange = (
    field: keyof UpdateTrackingFormValues["production"],
    value: string
  ) => {
    setValue("production", {
      ...getValues("production"),
      [field]: value,
    });
  };

  const handleShippingChange = (
    field: keyof UpdateTrackingFormValues["shipping"],
    value: string | null
  ) => {
    setValue("shipping", {
      ...getValues("shipping"),
      [field]: value || null,
    });
  };

  const handleClose = () => {
    reset(defaultValues, { keepDirty: false });
    close();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[600px] overflow-y-auto bg-sheet-bg p-0"
      >
        <SheetContainer>
          <SheetHeader
            title="Update Tracking"
            subtitle={
              <>
                <span className="font-semibold text-content">
                  {selectedItems.length} items
                </span>
                <span className="font-light text-content"> </span>
                <span className="text-content">will be updated</span>
              </>
            }
            onClose={handleClose}
          />

          <main className="flex flex-col flex-1 w-full items-start p-6 gap-4">
            <PlanningRequirementsSection
              poApprovalDate={formValues.planning.po_approval_date}
              hotelNeedByDate={formValues.planning.hotel_need_by_date}
              expectedDelivery={formValues.planning.expected_delivery}
              onFieldChange={(field, value) => {
                handlePlanningChange(
                  field as keyof UpdateTrackingFormValues["planning"],
                  value
                );
              }}
            />

            <ProductionShopSection
              cfaShopsSend={formValues.production.cfa_shops_send}
              cfaShopsApproved={formValues.production.cfa_shops_approved}
              cfaShopsDelivered={formValues.production.cfa_shops_delivered}
              onFieldChange={(field, value) => {
                handleProductionChange(
                  field as keyof UpdateTrackingFormValues["production"],
                  value
                );
              }}
            />
            <ShippingSection
              orderedDate={formValues.shipping.ordered_date}
              shippedDate={formValues.shipping.shipped_date}
              deliveredDate={formValues.shipping.delivered_date}
              shippingNotes={formValues.shipping.shipping_notes}
              onFieldChange={(field, value) => {
                handleShippingChange(
                  field as keyof UpdateTrackingFormValues["shipping"],
                  value
                );
              }}
            />
          </main>

          <SheetFooter
            onCancel={handleClose}
            onSave={handleSave}
            isLoading={isBulkUpdateTrackingPending}
            isSaveDisabled={!isDirty}
          />
        </SheetContainer>
      </SheetContent>
    </Sheet>
  );
};
