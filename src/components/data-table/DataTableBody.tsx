import { flexRender } from "@tanstack/react-table";
import { RenderIf } from "@/components/render-if";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import type { DataTableBodyProps } from "@/types/datatable";

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
            className="border-b-0 hover:bg-[#fafafa] transition-colors"
          >
            {row.getVisibleCells().map((cell) => {
              const meta = cell.column.columnDef.meta as
                | { cellClassName?: string }
                | undefined;
              const hasBorderInMeta = meta?.cellClassName?.includes("border-r");
              return (
                <TableCell
                  key={cell.id}
                  className={`p-3 ${
                    !hasBorderInMeta ? "border-r border-[#eeeeee]" : ""
                  } ${
                    meta?.cellClassName || ""
                  }  font-normal text-content text-xs `}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </RenderIf>
    </TableBody>
  );
}
