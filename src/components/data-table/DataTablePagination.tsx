import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageSize = table.getState().pagination.pageSize;
  
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  // Generate page numbers to display
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 4;
    
    if (pageCount <= maxVisible + 2) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else {
      if (pageIndex < maxVisible - 1) {
        for (let i = 0; i < maxVisible; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(pageCount - 1);
      } else if (pageIndex > pageCount - maxVisible) {
        pages.push(0);
        pages.push("...");
        for (let i = pageCount - maxVisible; i < pageCount; i++) {
          pages.push(i);
        }
      } else {
        pages.push(0);
        pages.push("...");
        pages.push(pageIndex - 1);
        pages.push(pageIndex);
        pages.push(pageIndex + 1);
        pages.push("...");
        pages.push(pageCount - 1);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Rows per page</span>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px] bg-card">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[5, 10, 20, 30, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-sm text-muted-foreground mr-2">
          {startRow}-{endRow} of {totalRows}
        </span>
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
          
        {getVisiblePages().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-1 text-sm text-muted-foreground">
                ...
              </span>
            );
          }
          
          const pageNum = page as number;
          const isActive = pageIndex === pageNum;
          
          return (
            <Button
              key={pageNum}
              variant="ghost"
              size="sm"
              className={`h-8 w-8 p-0 text-sm font-normal rounded-md ${
                isActive 
                  ? "bg-[hsl(222,47%,11%)] text-white hover:bg-[hsl(222,47%,11%)] hover:text-white" 
                  : "text-muted-foreground hover:text-foreground hover:bg-transparent"
              }`}
              onClick={() => table.setPageIndex(pageNum)}
            >
              {pageNum + 1}
            </Button>
          );
        })}
        
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </div>
    </div>
  );
}
