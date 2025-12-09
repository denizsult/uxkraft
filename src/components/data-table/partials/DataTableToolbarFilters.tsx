import type { ReactNode } from "react";
import { RenderIf } from "@/components/render-if";

interface DataTableToolbarFiltersProps {
  filters?: ReactNode;
}

export function DataTableToolbarFilters({
  filters,
}: DataTableToolbarFiltersProps) {
  return (
    <RenderIf condition={filters}>
      <div className="inline-flex items-center gap-2">{filters}</div>
    </RenderIf>
  );
}
