import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RenderIf } from "../render-if";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showIcon?: boolean;
};

export const DatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  showIcon = true,
  className,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "w-full flex justify-between items-center gap-2 border border-border rounded-md px-3 py-2 text-sm hover:bg-accent transition text-left disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
        >
          {value ? format(value, "MM/dd/yyyy", { locale: enUS }) : placeholder}

          <RenderIf condition={showIcon}>
            <img
              src="/icons/chevron-down.svg"
              className="w-3 h-3 flex-shrink-0"
            />
          </RenderIf>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value || undefined}
          onSelect={(date) => onChange(date || null)}
        />
      </PopoverContent>
    </Popover>
  );
};
