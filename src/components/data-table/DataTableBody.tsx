import { flexRender, type Table } from "@tanstack/react-table";

interface DataTableBodyProps<TData> {
  table: Table<TData>;
  columnsCount: number;
}

export function DataTableBody<TData>({
  table,
  columnsCount,
}: DataTableBodyProps<TData>) {
  return (
    <tbody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            data-state={row.getIsSelected() && "selected"}
            className="bg-card hover:bg-muted/50 data-[state=selected]:bg-blue-50"
          >
            {row.getVisibleCells().map((cell, index) => (
              <td
                key={cell.id}
                className={`py-3 px-4 align-middle border-t border-border ${
                  index < row.getVisibleCells().length - 1
                    ? "border-r border-border"
                    : ""
                }`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={columnsCount}
            className="h-24 text-center text-muted-foreground"
          >
            No results found.
          </td>
        </tr>
      )}
    </tbody>
  );
}

