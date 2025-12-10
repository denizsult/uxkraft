import React from "react";
import { Label } from "@/components/ui/label";

type SheetFormFieldProps = {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
};

export const SheetFormField = ({
  label,
  htmlFor,
  children,
  className,
  labelClassName,
}: SheetFormFieldProps) => {
  return (
    <div className={`flex flex-col items-start gap-2 ${className || ""}`}>
      <Label
        htmlFor={htmlFor}
        className={`font-medium text-content text-xs  leading-5 ${labelClassName || ""}`}
      >
        {label}
      </Label>
      {children}
    </div>
  );
};

