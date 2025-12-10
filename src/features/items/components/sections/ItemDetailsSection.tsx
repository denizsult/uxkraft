import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Item } from "../../types";

type ItemDetailsSectionProps = {
  item: Item;
};

const dateFields = [
  { id: "ordered-date", label: "Ordered Date" },
  { id: "shipped-date", label: "Shipped Date" },
  { id: "delivered-date", label: "Delivered Date" },
];

export const ItemDetailsSection = ({
  item,
}: ItemDetailsSectionProps): JSX.Element => {
  return (
    <section className="flex flex-col items-start gap-4 w-full">
      <Card className="w-full bg-white rounded-sm border border-solid border-slate-100">
        <CardContent className="flex flex-col items-start gap-5 p-6">
          <h2 className="font-semibold text-content text-sm  leading-8">
            Shipping
          </h2>
          <div className="grid grid-cols-3 gap-4 w-full">
            {dateFields.map((field) => (
              <div key={field.id} className="flex flex-col items-start gap-2">
                <Label
                  htmlFor={field.id}
                  className="font-medium text-black text-sm tracking-[0] leading-5"
                >
                  {field.label}
                </Label>
                <Select>
                  <SelectTrigger
                    id={field.id}
                    className="h-[42px] w-full bg-[#fcfcfc] rounded border border-solid border-[#e0e0e0] font-normal text-content text-xs tracking-[0] leading-6"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="placeholder">Select date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <Label
              htmlFor="shipping-notes"
              className="font-medium text-content text-xs  leading-5"
            >
              Shipping Notes
            </Label>
            <Textarea
              id="shipping-notes"
              defaultValue={item.ship_notes || "Delicate product"}
              className="min-h-[88px] w-full bg-[#fcfcfc] rounded border border-solid border-[#e0e0e0] font-normal text-content text-xs tracking-[0] leading-6 px-3 py-2"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

