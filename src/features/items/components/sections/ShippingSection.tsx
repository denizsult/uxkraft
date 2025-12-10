import { useForm, Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import type { Shipping } from "@/types/item";

type ItemDetailsSectionProps = {
  orderedDate?: Shipping["ordered_date"];
  shippedDate?: Shipping["shipped_date"];
  deliveredDate?: Shipping["delivered_date"];
  shippingNotes?: Shipping["shipping_notes"];
  onFieldChange: (field: string, value: string) => void;
};

type FormValues = {
  ordered_date: Date | null;
  shipped_date: Date | null;
  delivered_date: Date | null;
  shipping_notes: string;
};

const formFields = [
  { fieldName: "ordered_date" as const, label: "Ordered Date" },
  { fieldName: "shipped_date" as const, label: "Shipped Date" },
  { fieldName: "delivered_date" as const, label: "Delivered Date" },
];

export const ShippingSection = ({
  orderedDate,
  shippedDate,
  deliveredDate,
  shippingNotes,

  onFieldChange,
}: ItemDetailsSectionProps) => {
  const { control, setValue } = useForm<FormValues>({
    defaultValues: {
      ordered_date: orderedDate ? new Date(orderedDate) : null,
      shipped_date: shippedDate ? new Date(shippedDate) : null,
      delivered_date: deliveredDate ? new Date(deliveredDate) : null,
      shipping_notes: shippingNotes || "",
    },
  });

  const handleDateChange = (
    field: "ordered_date" | "shipped_date" | "delivered_date",
    value: Date | null
  ) => {
    setValue(field, value);
    const isoValue = value ? value.toISOString() : "";
    onFieldChange(field, isoValue);
  };

  const handleNotesChange = (value: string) => {
    setValue("shipping_notes", value);
    onFieldChange("shipping_notes", value);
  };

  return (
    <section className="flex flex-col items-start gap-4 w-full">
      <Card className="w-full bg-white rounded-sm border border-solid border-slate-100">
        <CardContent className="flex flex-col items-start gap-5 p-6">
          <h2 className="font-semibold text-content text-sm  leading-8">
            Shipping
          </h2>
          <div className="grid grid-cols-3 gap-4 w-full">
            {formFields.map((field) => (
              <div
                key={field.fieldName}
                className="flex flex-col items-start gap-2"
              >
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
                        handleDateChange(field.fieldName, date)
                      }
                      placeholder="Select date"
                      className="h-[42px] w-full bg-input-bg rounded border border-solid border-input-border font-normal text-content text-xs tracking-[0] leading-6 px-3 py-2"
                    />
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <Label
              htmlFor="shipping_notes"
              className="font-medium text-content text-xs  leading-5"
            >
              Shipping Notes
            </Label>
            <Controller
              name="shipping_notes"
              control={control}
              render={({ field: { value } }) => (
                <Textarea
                  id="shipping_notes"
                  value={value}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  className="min-h-[88px] w-full bg-input-bg rounded border border-solid border-input-border font-normal text-content text-xs tracking-[0] leading-6 px-3 py-2"
                  placeholder="Delicate product"
                />
              )}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
