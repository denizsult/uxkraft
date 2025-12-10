"use client";

import { flexRender, type Table } from "@tanstack/react-table";
import {
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import type { DataTableHeaderProps } from "@/types/datatable";

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="bg-[#f6f3f3] border-b border-[#d8d8d8] hover:bg-[#f6f3f3]">
          {headerGroup.headers.map((header, index) => {
            const meta = header.column.columnDef.meta as { headerClassName?: string } | undefined;
            const isLast = index === headerGroup.headers.length - 1;
            const hasBorderInMeta = meta?.headerClassName?.includes("border-r");
            return (
              <TableHead 
                key={header.id} 
                className={`h-10 px-3 py-2.5 ${meta?.headerClassName || ""} ${!hasBorderInMeta ? "border-r border-[#d8d8d8]" : ""} ${isLast ? "last:border-r-0" : ""}  font-medium text-[#616161] text-xs`}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

