import { useState } from "react";
import type { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Item } from "@/types/item";

interface ItemsTableFiltersProps {
  table: Table<Item>;
  phaseOptions: string[];
  vendorOptions: string[];
  onCSVDownload?: () => void;
}

const PhaseSelect = ({
  table,
  options,
}: {
  table: Table<Item>;
  options: string[];
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const handlePhaseSelect = (value: string) => {
    if (value === "all" || value === "") {
      setSelectedPhase(null);
      table.getColumn("phase")?.setFilterValue(undefined);
    } else {
      setSelectedPhase(value);
      table.getColumn("phase")?.setFilterValue([value]);
    }
  };

  return (
    <Select value={selectedPhase || ""} onValueChange={handlePhaseSelect}>
      <SelectTrigger className="h-[42px] gap-2 bg-input-bg border-input-border min-w-32   font-medium text-content text-xs">
        <SelectValue placeholder="Phase" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            Phase {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const VendorSelect = ({
  table,
  options,
}: {
  table: Table<Item>;
  options: string[];
}) => {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const handleVendorSelect = (value: string) => {
    if (value === "all" || value === "") {
      setSelectedVendor(null);
      table.getColumn("ship_from")?.setFilterValue(undefined);
    } else {
      setSelectedVendor(value);
      table.getColumn("ship_from")?.setFilterValue(value);
    }
  };

  return (
    <Select value={selectedVendor || ""} onValueChange={handleVendorSelect}>
      <SelectTrigger className="h-[42px] gap-2 bg-input-bg border-input-border  min-w-32 font-medium text-content text-xs">
        <SelectValue placeholder="Vendor" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const ItemsTableFilters = ({
  table,
  phaseOptions,
  vendorOptions,
  onCSVDownload,
}: ItemsTableFiltersProps) => {
  return (
    <>
      <PhaseSelect table={table} options={phaseOptions} />
      <VendorSelect table={table} options={vendorOptions} />
      <img
        className="cursor-pointer"
        alt="Frame"
        src="/icons/frame-36593.svg"
        onClick={() => {
          console.log("Import clicked");
          onCSVDownload?.();
        }}
      />
    </>
  );
};
