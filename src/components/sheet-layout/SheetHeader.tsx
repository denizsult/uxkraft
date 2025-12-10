import React from "react";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

type SheetHeaderProps = {
  title: string;
  subtitle?: React.ReactNode;
  onClose: () => void;
  actionButton?: React.ReactNode;
  className?: string;
  bgTransparent?: boolean;
};

export const SheetHeader = ({
  title,
  subtitle,
  onClose,
  actionButton,
  className,
  bgTransparent = false,
}: SheetHeaderProps) => {
  return (
    <header
      className={`flex items-start gap-5 pt-6 pb-4 px-6 w-full ${
        bgTransparent ? "bg-transparent" : "bg-sheet-bg"
      } rounded-[4px_4px_2px_2px] relative ${className || ""}`}
    >
      <div className="flex flex-col items-start gap-4 flex-1">
        <div className="flex items-center gap-4 w-full">
          <h1 className="font-medium text-[#1f0909] text-xl  leading-8 whitespace-nowrap">
            {title}
          </h1>
          {actionButton}
        </div>
        {subtitle && (
          <p className="font-normal text-xs  leading-3">
            {subtitle}
          </p>
        )}
      </div>
      <SheetClose asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-1 absolute top-3 right-3 rounded-md"
          onClick={onClose}
        >
          <XIcon className="w-6 h-6" />
        </Button>
      </SheetClose>
    </header>
  );
};

