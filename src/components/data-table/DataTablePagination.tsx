import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DataTablePaginationProps } from "@/types/datatable";

const rowsPerPageOptions = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
];

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageSize = table.getState().pagination.pageSize;
  
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  // Generate page numbers to display (max 4 pages)
  const getVisiblePages = () => {
    const maxVisible = 4;
    
    if (pageCount <= maxVisible) {
      return Array.from({ length: pageCount }, (_, i) => i);
    }
    
    // Determine start page based on current position
    let start: number;
    if (pageIndex < 2) {
      // Near start: show first pages
      start = 0;
    } else if (pageIndex > pageCount - 3) {
      // Near end: show last pages
      start = pageCount - maxVisible;
    } else {
      // Middle: show current page with one before and two after
      start = pageIndex - 1;
    }
    
 
    return Array.from({ length: maxVisible }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className="flex items-center justify-between w-full"
      aria-label="Table pagination"
    >
      <div className="inline-flex items-center justify-end gap-3">
        <label
          htmlFor="rows-per-page"
          className="[font-family:'Inter',Helvetica] font-medium text-[#271716] text-xs"
        >
          Rows per page
        </label>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger
            id="rows-per-page"
            className="h-8 w-[70px] bg-[#fcfcfc] border-[#e0e0e0] [font-family:'Inter',Helvetica] font-medium text-[#271716] text-xs"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {rowsPerPageOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="inline-flex items-center justify-end gap-8">
        <div className="[font-family:'Inter',Helvetica] font-medium text-[#271716] text-xs text-center">
          {startRow}-{endRow} of {totalRows}
        </div>
        <div className="inline-flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 p-0 hover:bg-transparent cursor-pointer"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            aria-label="Previous page"
          >
            <img
              className="w-4 h-4"
              alt="Previous page"
              src="/icons/sort-left-1.svg"
            />
          </Button>
          {visiblePages.map((pageNum) => {
            const isActive = pageIndex === pageNum;
            return (
              <Button
                key={pageNum}
                variant="ghost"
                size="sm"
                className={`h-auto p-0 min-w-0 [font-family:'Inter',Helvetica] font-bold text-sm tracking-[0] leading-[30px] cursor-pointer hover:bg-transparent ${
                  isActive
                    ? "text-[#8e2424] underline"
                    : "text-[#271716]"
                }`}
                onClick={() => table.setPageIndex(pageNum)}
                aria-label={`Page ${pageNum + 1}`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNum + 1}
              </Button>
            );
          })}
          <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 p-0 hover:bg-transparent cursor-pointer"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            aria-label="Next page"
          >
            <img
              className="w-4 h-4"
              alt="Next page"
              src="/icons/sort-left-2.svg"
            />
          </Button>
        </div>
      </div>
    </nav>
  );
}
