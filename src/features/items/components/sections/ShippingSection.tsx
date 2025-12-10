import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RenderIf } from "@/components/render-if";
import { differenceInDays } from "date-fns";
import type { Item } from "../../types";

type ShippingSectionProps = {
  item: Item;
};

export const ShippingSection = ({
  item,
}: ShippingSectionProps): JSX.Element => {
  const poApprovalDate = item.planning?.po_approval_date
    ? new Date(item.planning.po_approval_date)
    : new Date("2025-11-12");
  const hotelNeedByDate = item.planning?.hotel_need_by_date
    ? new Date(item.planning.hotel_need_by_date)
    : new Date("2025-11-28");
  const expectedDelivery = item.planning?.expected_delivery
    ? new Date(item.planning.expected_delivery)
    : new Date("2025-11-30");

  const daysLate = differenceInDays(expectedDelivery, hotelNeedByDate);

  const dateFields = [
    {
      label: "PO Approval Date",
      value: poApprovalDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      hasError: false,
    },
    {
      label: "Hotel Need by Date",
      value: hotelNeedByDate.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      hasError: false,
    },
    {
      label: "Expected Delivery",
      value: expectedDelivery.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }),
      hasError: daysLate > 0,
      errorMessage: `Late by ${daysLate} ${daysLate === 1 ? "day" : "days"}`,
    },
  ];

  return (
    <section className="flex flex-col items-start gap-4 w-full">
      <Card className="w-full bg-white rounded-sm border border-solid border-slate-100">
        <CardContent className="flex flex-col items-start gap-5 p-6">
          <h2 className="font-semibold text-content text-sm  leading-8">
            Planning &amp; Requirements
          </h2>
          <div className="grid grid-cols-3 gap-4 w-full">
            {dateFields.map((field, index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <Label className="font-medium text-content text-xs  leading-5">
                  {field.label}
                </Label>
                <div className="flex flex-col items-start gap-1 w-full">
                  <div className="flex h-[42px] items-center gap-2 w-full px-3 bg-[#fcfcfc] rounded border border-solid border-[#e0e0e0]">
                    <span className="flex-1 leading-6 font-normal text-content text-xs tracking-[0]">
                      {field.value}
                    </span>
                    <ChevronDownIcon className="w-4 h-4 flex-shrink-0 text-content" />
                  </div>
                </div>
                <RenderIf condition={field.hasError}>
                  <div className="inline-flex items-center gap-2">
                    <span className="font-medium text-[#ce2d2d] text-xs tracking-[0] leading-5 whitespace-nowrap">
                      {field.errorMessage}
                    </span>
                  </div>
                </RenderIf>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

