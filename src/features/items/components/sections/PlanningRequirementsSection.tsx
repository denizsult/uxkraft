import { useForm, Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RenderIf } from "@/components/render-if";
import { DatePicker } from "@/components/ui/date-picker";
import { differenceInDays, format } from "date-fns";
import type { Planning } from "@/types/item";

type PlanningRequirementsSectionProps = {
  poApprovalDate?: Planning['po_approval_date'];
  hotelNeedByDate?: Planning['hotel_need_by_date'];
  expectedDelivery?: Planning['expected_delivery'];
  onFieldChange: (field: string, value: string) => void;
};

type FormValues = {
  po_approval_date: Date | null;
  hotel_need_by_date: Date | null;
  expected_delivery: Date | null;
};

const formFields = [
  { fieldName: "po_approval_date" as const, label: "PO Approval Date" },
  { fieldName: "hotel_need_by_date" as const, label: "Hotel Need by Date" },
  { fieldName: "expected_delivery" as const, label: "Expected Delivery" },
];

export const PlanningRequirementsSection = ({
  poApprovalDate,
  hotelNeedByDate,
  expectedDelivery,
  onFieldChange,
}: PlanningRequirementsSectionProps) => {
  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      po_approval_date: poApprovalDate ? new Date(poApprovalDate) : null,
      hotel_need_by_date: hotelNeedByDate ? new Date(hotelNeedByDate) : null,
      expected_delivery: expectedDelivery ? new Date(expectedDelivery) : null,
    },
  });

  const watchedHotelNeedByDate = watch("hotel_need_by_date");
  const watchedExpectedDelivery = watch("expected_delivery");

  const daysLate =
    watchedExpectedDelivery && watchedHotelNeedByDate
      ? differenceInDays(watchedExpectedDelivery, watchedHotelNeedByDate)
      : 0;

  const handleDateChange = (field: "po_approval_date" | "hotel_need_by_date" | "expected_delivery", value: Date | null) => {
    setValue(field, value);
    const dateValue = value ? format(value, "yyyy-MM-dd") : "";
    onFieldChange(field, dateValue);
  };

  return (
    <section className="flex flex-col items-start gap-4 w-full">
      <Card className="w-full bg-white rounded-sm border border-solid border-slate-100">
        <CardContent className="flex flex-col items-start gap-5 p-6">
          <h2 className="font-semibold text-content text-sm  leading-8">
            Planning &amp; Requirements
          </h2>
          <div className="grid grid-cols-3 gap-4 w-full">
            {formFields.map((field) => (
              <div key={field.fieldName} className="flex flex-col items-start gap-2">
                <Label
                  htmlFor={field.fieldName}
                  className="font-medium text-black text-sm tracking-[0] leading-5"
                >
                  {field.label}
                </Label>
                <Controller
                  name={field.fieldName}
                  control={control}
                  render={({ field: { value } }) => (
                    <DatePicker
                      value={value || null}
                      onChange={(date) =>
                        handleDateChange(
                          field.fieldName,
                          date
                        )
                      }
                      placeholder="Select date"
                      className="h-[42px] w-full bg-input-bg rounded border border-solid border-input-border font-normal text-content text-xs tracking-[0] leading-6 px-3 py-2"
                    />
                  )}
                />
                <RenderIf condition={field.fieldName === "expected_delivery" && daysLate > 0}>
                  <div className="inline-flex items-center gap-2">
                    <span className="font-medium text-[#ce2d2d] text-xs tracking-[0] leading-5 whitespace-nowrap">
                      Late by {daysLate} {daysLate === 1 ? "day" : "days"}
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

