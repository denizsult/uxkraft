import React from "react";
import { Card, CardContent } from "@/components/ui/card";

type SheetCardProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export const SheetCard = ({
  children,
  className,
  contentClassName,
}: SheetCardProps) => {
  return (
    <Card className={`w-full bg-white rounded-sm border border-solid border-slate-100 ${className || ""}`}>
      <CardContent className={`flex flex-col items-start gap-5 p-6 ${contentClassName || ""}`}>
        {children}
      </CardContent>
    </Card>
  );
};

