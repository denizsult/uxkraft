import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DatePicker } from "@/components/ui/date-picker";
import { useUpdateTrackingSheet } from "@/stores/update-tracking-sheet";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import {
  SheetHeader,
  SheetFooter,
  SheetContainer,
  SheetCard,
  SheetFormField,
  SheetSection,
} from "@/components/sheet-layout";

type UpdateTrackingFormValues = {
  poApprovalDate: Date | null;
  hotelNeedByDate: Date | null;
  expectedDelivery: Date | null;
  cfaShopsSend: Date | null;
  cfaShopsApproved: Date | null;
  cfaShopsDelivered: Date | null;
  orderedDate: Date | null;
  shippedDate: Date | null;
  deliveredDate: Date | null;
  shippingNotes: string;
};

export const UpdateTrackingSheet = () => {
  const { isOpen, close, selectedItems } = useUpdateTrackingSheet();
  
  // Debounce timer ref for auto-save
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { watch, setValue, reset } = useForm<UpdateTrackingFormValues>({
    defaultValues: {
      poApprovalDate: null,
      hotelNeedByDate: null,
      expectedDelivery: null,
      cfaShopsSend: null,
      cfaShopsApproved: null,
      cfaShopsDelivered: null,
      orderedDate: null,
      shippedDate: null,
      deliveredDate: null,
      shippingNotes: "",
    },
  });

  const formValues = watch();

  // Handle field change with auto-save (debounced)
  const handleDateChange = (
    fieldName: keyof UpdateTrackingFormValues,
    value: Date | null
  ) => {
    setValue(fieldName, value, { shouldDirty: true });

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce auto-save
    debounceTimerRef.current = setTimeout(() => {
      const currentFormValues = watch();
      console.log("Update Tracking form updated:", currentFormValues);
      // Here you would call an API to update the items
    }, 500);
  };

  const handleTextChange = (
    fieldName: keyof UpdateTrackingFormValues,
    value: string
  ) => {
    setValue(fieldName, value, { shouldDirty: true });

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce auto-save
    debounceTimerRef.current = setTimeout(() => {
      const currentFormValues = watch();
      console.log("Update Tracking form updated:", currentFormValues);
      // Here you would call an API to update the items
    }, 500);
  };

  const handleSave = () => {
    const currentFormValues = watch();
    console.log("Saving update tracking for items:", selectedItems);
    console.log("Form values:", currentFormValues);
    // TODO: Implement bulk update logic
    close();
    reset();
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      close();
      reset();
    }
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
                <span className="font-semibold text-content tracking-[0.02px]">
                  {selectedItems.length} items
                </span>
                <span className="font-light text-content tracking-[0.02px]">
                  {" "}
                </span>
                <span className="text-content tracking-[0.02px]">
                  will be updated
                </span>
              </>
            }
            onClose={() => handleClose(false)}
          />

          <main className="flex flex-col flex-1 w-full items-start p-6 gap-4">
            <SheetSection>
              <SheetCard className="border-none" contentClassName="gap-6">
                <div className="flex flex-col items-start gap-6 w-full">
                  <h2 className="font-semibold text-content text-sm  leading-8">
                    Planning &amp; Requirements
                  </h2>
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <SheetFormField label="PO Approval Date" htmlFor="po-approval-date">
                      <DatePicker
                        value={formValues.poApprovalDate}
                        onChange={(date) =>
                          handleDateChange("poApprovalDate", date)
                        }
                      />
                    </SheetFormField>
                    <SheetFormField label="Hotel Need by Date" htmlFor="hotel-need-date">
                      <DatePicker
                        value={formValues.hotelNeedByDate}
                        onChange={(date) =>
                          handleDateChange("hotelNeedByDate", date)
                        }
                      />
                    </SheetFormField>
                    <SheetFormField label="Expected Delivery" htmlFor="expected-delivery">
                      <DatePicker
                        value={formValues.expectedDelivery}
                        onChange={(date) =>
                          handleDateChange("expectedDelivery", date)
                        }
                      />
                    </SheetFormField>
                  </div>
                </div>
              </SheetCard>
            </SheetSection>

            <SheetSection>
              <SheetCard contentClassName="gap-5">
                <h2 className="font-semibold text-content text-sm  leading-8">
                  Production &amp; Shop
                </h2>
                <div className="grid grid-cols-3 gap-4 w-full">
                  <SheetFormField
                    label="CFA/Shops Send"
                    htmlFor="cfa-shops-send"
                    labelClassName="font-medium text-black text-sm tracking-[0] leading-5"
                  >
                    <DatePicker
                      value={formValues.cfaShopsSend}
                      onChange={(date) =>
                        handleDateChange("cfaShopsSend", date)
                      }
                    />
                  </SheetFormField>
                  <SheetFormField
                    label="CFA/Shops Approved"
                    htmlFor="cfa-shops-approved"
                    labelClassName="font-medium text-black text-sm tracking-[0] leading-5"
                  >
                    <DatePicker
                      value={formValues.cfaShopsApproved}
                      onChange={(date) =>
                        handleDateChange("cfaShopsApproved", date)
                      }
                    />
                  </SheetFormField>
                  <SheetFormField
                    label="CFA/Shops Delivered"
                    htmlFor="cfa-shops-delivered"
                    labelClassName="font-medium text-black text-sm tracking-[0] leading-5"
                  >
                    <DatePicker
                      value={formValues.cfaShopsDelivered}
                      onChange={(date) =>
                        handleDateChange("cfaShopsDelivered", date)
                      }
                    />
                  </SheetFormField>
                </div>
              </SheetCard>
            </SheetSection>

            <SheetSection>
              <SheetCard contentClassName="gap-6">
                <div className="flex flex-col items-start gap-6 w-full">
                  <h2 className="font-semibold text-content text-sm  leading-8">
                    Shipping
                  </h2>
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <SheetFormField
                      label="Ordered Date"
                      htmlFor="ordered-date"
                      labelClassName="font-medium text-black text-sm tracking-[0] leading-5"
                    >
                      <DatePicker
                        value={formValues.orderedDate}
                        onChange={(date) =>
                          handleDateChange("orderedDate", date)
                        }
                      />
                    </SheetFormField>
                    <SheetFormField
                      label="Shipped Date"
                      htmlFor="shipped-date"
                      labelClassName="font-medium text-black text-sm tracking-[0] leading-5"
                    >
                      <DatePicker
                        value={formValues.shippedDate}
                        onChange={(date) =>
                          handleDateChange("shippedDate", date)
                        }
                      />
                    </SheetFormField>
                    <SheetFormField
                      label="Delivered Date"
                      htmlFor="delivered-date"
                      labelClassName="font-medium text-black text-sm tracking-[0] leading-5"
                    >
                      <DatePicker
                        value={formValues.deliveredDate}
                        onChange={(date) =>
                          handleDateChange("deliveredDate", date)
                        }
                      />
                    </SheetFormField>
                  </div>
                  <SheetFormField label="Shipping Notes" htmlFor="shipping-notes" className="w-full">
                    <Textarea
                      id="shipping-notes"
                      value={formValues.shippingNotes}
                      onChange={(e) =>
                        handleTextChange("shippingNotes", e.target.value)
                      }
                      className="min-h-[66px] bg-[#fcfcfc] border-[#e0e0e0] font-normal text-content text-xs tracking-[0] leading-6 resize-none"
                      placeholder="Delicate product"
                    />
                  </SheetFormField>
                </div>
              </SheetCard>
            </SheetSection>
          </main>

          <SheetFooter
            onCancel={() => handleClose(false)}
            onSave={handleSave}
          />
        </SheetContainer>
      </SheetContent>
    </Sheet>
  );
};

