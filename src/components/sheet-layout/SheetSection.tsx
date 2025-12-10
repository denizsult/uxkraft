import React from "react";

type SheetSectionProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  wrapperClassName?: string;
};

export const SheetSection = ({
  title,
  children,
  className,
  titleClassName,
  wrapperClassName,
}: SheetSectionProps) => {
  return (
    <section className={`w-full ${wrapperClassName || ""}`}>
      <div className={`flex flex-col items-start gap-2 flex-1 ${className || ""}`}>
        {title && (
          <h2 className={`font-semibold text-content text-sm  leading-8 ${titleClassName || ""}`}>
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

