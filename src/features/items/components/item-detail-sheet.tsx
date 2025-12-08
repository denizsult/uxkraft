import { useForm } from "react-hook-form";
import { Download, ChevronDown } from "lucide-react";
import { differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DatePicker } from "@/components/ui/date-picker";
import { RenderIf } from "@/components/render-if";
import { useItemDetailSheet } from "@/stores/item-detail-sheet";
import { formatCurrency } from "@/utils/format";
import { useMemo } from "react";
import type { PlanningRequirementsFormValues } from "../types";

export const ItemDetailSheet = () => {
  const { isOpen, item, close } = useItemDetailSheet();

  const { watch, setValue, reset } = useForm<PlanningRequirementsFormValues>({
    values: {
      poApprovalDate: item?.poApprovalDate
        ? new Date(item.poApprovalDate)
        : new Date("2025-11-12"),
      hotelNeedByDate: item?.hotelNeedByDate
        ? new Date(item.hotelNeedByDate)
        : new Date("2025-11-28"),
      expectedDelivery: item?.expectedDelivery
        ? new Date(item.expectedDelivery)
        : new Date("2025-11-30"),
    },
  });

  /* Prevent empty item from rendering */
  if (!item) return null;

  const formValues = watch();

  const daysLate = useMemo(() => {
    return differenceInDays(
      formValues?.expectedDelivery || new Date(),
      formValues?.hotelNeedByDate || new Date()
    );
  }, [formValues]);

  const handleFieldChange = (
    fieldName: keyof PlanningRequirementsFormValues,
    value: Date | null
  ) => {
    setValue(fieldName, value, { shouldDirty: true });
  };

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      close();
      reset();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Items Management</SheetTitle>
        </SheetHeader>

        <div className="mt-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Item #{item.itemNumber} - {item.itemName}
              </h2>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase">
                  Spec #
                </label>
                <p className="text-sm font-medium mt-1">{item.specNumber}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase">
                  Vendor
                </label>
                <p className="text-sm font-medium mt-1">{item.vendor}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase">
                  Phase
                </label>
                <p className="text-sm font-medium mt-1">{item.phase}</p>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase">
                  Ship to
                </label>
                <p className="text-sm font-medium mt-1">{item.shipTo}</p>
                <p className="text-xs text-muted-foreground">
                  123 Sunshine Blvd, Miami, FL
                </p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase">
                  Ship From
                </label>
                <p className="text-sm font-medium mt-1">{item.vendor}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase">
                  Notes for this item
                </label>
                <p className="text-sm font-medium mt-1">
                  Check fabric when modifying
                </p>
              </div>
            </div>

            {/* Location Info */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase">
                  Location
                </label>
                <p className="text-sm font-medium mt-1">Guest Room</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase">
                  Category
                </label>
                <p className="text-sm font-medium mt-1">{item.itemName}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase">
                  Upload
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground truncate">
                    {item.specNumber} 2ND FLO...
                  </span>
                  <Download className="size-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Details Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-semibold">
                      Description
                    </th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-semibold">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-semibold">
                      Markup
                    </th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-semibold">
                      Unit Price
                    </th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-semibold">
                      Qty
                    </th>
                    <th className="text-left py-3 px-4 text-xs text-muted-foreground font-semibold">
                      Unit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">
                      Brand: Harmony Home, TextilesMod...
                    </td>
                    <td className="py-3 px-4">
                      {formatCurrency(item.price / item.qty)}
                    </td>
                    <td className="py-3 px-4">20%</td>
                    <td className="py-3 px-4">{formatCurrency(item.price)}</td>
                    <td className="py-3 px-4">{item.qty}</td>
                    <td className="py-3 px-4">each</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Price */}
            <div className="flex justify-end gap-8 mb-8 pb-8 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase mb-2">
                  Total Price
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(item.price * item.qty)}
                </p>
              </div>
            </div>

            {/* Planning & Requirements */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-4">
                Planning & Requirements
              </h3>
              <div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs text-muted-foreground font-semibold uppercase mb-2 block">
                      PO Approval Date
                    </label>
                    <DatePicker
                      value={formValues.poApprovalDate}
                      onChange={(date) =>
                        handleFieldChange("poApprovalDate", date)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-semibold uppercase mb-2 block">
                      Hotel Need by Date
                    </label>
                    <DatePicker
                      value={formValues.hotelNeedByDate}
                      onChange={(date) =>
                        handleFieldChange("hotelNeedByDate", date)
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground font-semibold uppercase mb-2 block">
                      Expected Delivery
                    </label>
                    <DatePicker
                      value={formValues.expectedDelivery}
                      onChange={(date) =>
                        handleFieldChange("expectedDelivery", date)
                      }
                    />
                    <RenderIf condition={daysLate !== null && daysLate > 0}>
                      <p className="text-xs text-red-500 mt-2">
                        Late by {daysLate} {daysLate === 1 ? "day" : "days"}
                      </p>
                    </RenderIf>
                  </div>
                </div>
              </div>
            </div>

            {/* Production & Shop */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-4">Production & Shop</h3>
              <div className="grid grid-cols-3 gap-4">
                <button className="border border-border rounded-md px-3 py-2 text-sm hover:bg-accent transition">
                  <div className="flex items-center justify-between">
                    <span>CFA/Shops Send</span>
                    <ChevronDown className="size-4" />
                  </div>
                </button>
                <button className="border border-border rounded-md px-3 py-2 text-sm hover:bg-accent transition">
                  <div className="flex items-center justify-between">
                    <span>CFA/Shops Approved</span>
                    <ChevronDown className="size-4" />
                  </div>
                </button>
                <button className="border border-border rounded-md px-3 py-2 text-sm hover:bg-accent transition">
                  <div className="flex items-center justify-between">
                    <span>CFA/Shops Delivered</span>
                    <ChevronDown className="size-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Shipping */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold mb-4">Shipping</h3>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <button className="border border-border rounded-md px-3 py-2 text-sm hover:bg-accent transition">
                  <div className="flex items-center justify-between">
                    <span>Ordered Date</span>
                    <ChevronDown className="size-4" />
                  </div>
                </button>
                <button className="border border-border rounded-md px-3 py-2 text-sm hover:bg-accent transition">
                  <div className="flex items-center justify-between">
                    <span>Shipped Date</span>
                    <ChevronDown className="size-4" />
                  </div>
                </button>
                <button className="border border-border rounded-md px-3 py-2 text-sm hover:bg-accent transition">
                  <div className="flex items-center justify-between">
                    <span>Delivered Date</span>
                    <ChevronDown className="size-4" />
                  </div>
                </button>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase mb-2 block">
                  Shipping Notes
                </label>
                <textarea
                  className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                  rows={4}
                  placeholder="Delicate product"
                  defaultValue={item.shipNotes}
                />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
