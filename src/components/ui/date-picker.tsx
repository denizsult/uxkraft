import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type DatePickerProps = {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const DatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className="w-full flex items-center gap-2 border border-border rounded-md px-3 py-2 text-sm hover:bg-accent transition text-left disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="flex-1">
            {value
              ? format(value, "MM/dd/yyyy", { locale: enUS })
              : placeholder}
          </span>
          <ChevronDown className="size-4 text-muted-foreground" />
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

