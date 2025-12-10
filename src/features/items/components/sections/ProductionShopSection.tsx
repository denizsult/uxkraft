
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import type { Production } from "@/types/item";

type ProductionShopSectionProps = {
  cfaShopsSend?: Production["cfa_shops_send"];
  cfaShopsApproved?: Production["cfa_shops_approved"];
  cfaShopsDelivered?: Production["cfa_shops_delivered"];
  onFieldChange: (field: string, value: string) => void;
};

type FormValues = {
  cfa_shops_send: Date | null;
  cfa_shops_approved: Date | null;
  cfa_shops_delivered: Date | null;
};

const dateFields = [
  {
    fieldName: "cfa_shops_send" as const,
    label: "CFA/Shops Send",
  },
  {
    fieldName: "cfa_shops_approved" as const,
    label: "CFA/Shops Approved",
  },
  {
    fieldName: "cfa_shops_delivered" as const,
    label: "CFA/Shops Delivered",
  },
];

export const ProductionShopSection = ({
  cfaShopsSend,
  cfaShopsApproved,
  cfaShopsDelivered,
  onFieldChange,
}: ProductionShopSectionProps) => {
  const { control, setValue } = useForm<FormValues>({
    defaultValues: {
      cfa_shops_send: cfaShopsSend || null,
      cfa_shops_approved: cfaShopsApproved || null,
      cfa_shops_delivered: cfaShopsDelivered || null,
    },
  });

  const handleFieldChange = (field: keyof FormValues, value: Date | null) => {
    setValue(field, value);
    const isoValue = value ? value.toISOString() : "";
    onFieldChange(field, isoValue);
  };

  return (
    <section className="flex flex-col items-start gap-4 w-full">
      <div className="flex flex-col items-start gap-5 px-6 py-5 w-full bg-white rounded-sm border border-solid border-slate-100">
        <h2 className="font-semibold text-content text-sm  leading-8">
          Production &amp; Shop
        </h2>
        <div className="grid grid-cols-3 gap-4 w-full">
          {dateFields.map((field) => (
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
                name={field.fieldName as keyof FormValues}
                control={control}
                render={({ field: { value } }) => (
                  <DatePicker
                    value={value || null}
                    onChange={(date) =>
                      handleFieldChange(
                        field.fieldName as keyof FormValues,
                        date
                      )
                    }
                    placeholder="Select date"
                    className="h-[42px]  w-full bg-input-bg rounded border border-solid border-input-border font-normal text-content text-xs tracking-[0] leading-6 px-3 py-2"
                  />
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
