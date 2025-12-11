import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useUpdateTrackingSheet } from "@/stores/update-tracking-sheet";
import { useForm } from "react-hook-form";
import { SheetHeader, SheetFooter, SheetContainer } from "@/components/sheet-layout";
import { PlanningRequirementsSection, ProductionShopSection } from "../sections";
import { ShippingSection } from "../sections/ShippingSection";
import { useBulkUpdateTracking } from "../../api";

type UpdateTrackingFormValues = {
  shipping: {
    ordered_date?: Date;
    shipped_date?: Date;
    delivered_date?: Date;
    shipping_notes?: string;
  };
  production: {
    cfa_shops_send?: Date;
    cfa_shops_approved?: Date;
    cfa_shops_delivered?: Date;
  };
  planning: {
    po_approval_date?: Date;
    hotel_need_by_date?: Date;
    expected_delivery?: Date;
  };
};

const defaultValues: UpdateTrackingFormValues = {
  shipping: {},
  production: {},
  planning: {},
};

export const UpdateTrackingSheet = () => {
  const { isOpen, close, selectedItems } = useUpdateTrackingSheet();

  const { mutateAsync, isPending } = useBulkUpdateTracking({
    refetchQueries: ["useGetItems"],
    onSuccessMessage: "Tracking updated successfully",
    onErrorMessage: "Failed to update tracking",
    onSuccess: () => handleClose(),
  });

  const {
    setValue,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<UpdateTrackingFormValues>({
    defaultValues,
  });

  const values = watch();

  /** 
   * Unified nested updater:
   * update("planning.po_approval_date", newValue)
   */
  const update = (path: string, value: any) => {
    setValue(path as any, value , { shouldDirty: true });
  };

  const handleSave = async () => {
    await mutateAsync({
      item_ids: selectedItems.map((i) => i.id),
      planning: values.planning,
      production: values.production,
      shipping: values.shipping,
    });
  };

  const handleClose = () => {
    reset(defaultValues);
    close();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-full sm:max-w-[600px] bg-sheet-bg p-0 overflow-y-auto">
        <SheetContainer>
          <SheetHeader
            title="Update Tracking"
            subtitle={
              <>
                <span className="font-semibold">{selectedItems.length} items</span>
                <span> will be updated</span>
              </>
            }
            onClose={handleClose}
          />

          <main className="flex flex-col flex-1 p-6 gap-4">
            <PlanningRequirementsSection
              poApprovalDate={values.planning.po_approval_date}
              hotelNeedByDate={values.planning.hotel_need_by_date}
              expectedDelivery={values.planning.expected_delivery}
              onFieldChange={(field, v) => update(`planning.${field}`, v ? new Date(v) : null)}
            />

            <ProductionShopSection
              cfaShopsSend={values.production.cfa_shops_send}
              cfaShopsApproved={values.production.cfa_shops_approved}
              cfaShopsDelivered={values.production.cfa_shops_delivered}
              onFieldChange={(field, v) => update(`production.${field}`, v )}
            />

            <ShippingSection
              orderedDate={values.shipping.ordered_date}
              shippedDate={values.shipping.shipped_date}
              deliveredDate={values.shipping.delivered_date}
              shippingNotes={values.shipping.shipping_notes}
              onFieldChange={(field, v) => update(`shipping.${field}`, v )}
            />
          </main>

          <SheetFooter
            onCancel={handleClose}
            onSave={handleSave}
            isLoading={isPending}
            isSaveDisabled={!isDirty}
          />
        </SheetContainer>
      </SheetContent>
    </Sheet>
  );
};
