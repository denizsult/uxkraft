import React from "react";

type SheetContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const SheetContainer = ({
  children,
  className,
}: SheetContainerProps) => {
  return (
    <div
      className={`flex flex-col min-h-screen bg-sheet-bg border border-solid border-[#e0e0e0] ${className || ""}`}
    >
      {children}
    </div>
  );
};

