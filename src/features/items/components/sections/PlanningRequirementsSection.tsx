import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selectFields = [
  {
    id: "cfa-shops-send",
    label: "CFA/Shops Send",
    placeholder: "",
  },
  {
    id: "cfa-shops-approved",
    label: "CFA/Shops Approved",
    placeholder: "",
  },
  {
    id: "cfa-shops-delivered",
    label: "CFA/Shops Delivered",
    placeholder: "",
  },
];

export const PlanningRequirementsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start gap-4 w-full">
      <div className="flex flex-col items-start gap-5 px-6 py-5 w-full bg-white rounded-sm border border-solid border-slate-100">
        <h2 className="font-semibold text-content text-sm  leading-8">
          Production &amp; Shop
        </h2>
        <div className="grid grid-cols-3 gap-4 w-full">
          {selectFields.map((field) => (
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
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placeholder">Select an option</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

