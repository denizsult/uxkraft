"use client";

import { flexRender, type Table } from "@tanstack/react-table";
import { RenderIf } from "@/components/render-if";
import {
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface DataTableBodyProps<TData> {
  table: Table<TData>;
  columnsCount: number;
}

export function DataTableBody<TData>({
  table,
  columnsCount,
}: DataTableBodyProps<TData>) {
  return (
    <TableBody>
      <RenderIf
        condition={table.getRowModel().rows?.length}
        fallback={
          <TableRow>
            <TableCell colSpan={columnsCount} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        }
      >
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </RenderIf>
    </TableBody>
  );
}

