import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { RenderIf } from "@/components/render-if";

interface DataTableToolbarSearchProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;
}

export function DataTableToolbarSearch({
  globalFilter,
  setGlobalFilter,
  searchPlaceholder = "Search...",
  showSearch = true,
}: DataTableToolbarSearchProps) {
  return (
    <RenderIf condition={showSearch}>
      <div className="flex flex-col gap-2 flex-1">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#616161]" />
          <Input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="h-[42px] pl-9 pr-3 bg-[#fcfcfc] border-[#e0e0e0] [font-family:'Inter',Helvetica] font-normal text-[#616161] text-xs"
          />
        </div>
      </div>
    </RenderIf>
  );
}
