import { flexRender, type Table } from "@tanstack/react-table";

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
}

export function DataTableHeader<TData>({ table }: DataTableHeaderProps<TData>) {
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} className="bg-[hsl(220,14%,96%)]">
          {headerGroup.headers.map((header, index) => (
            <th
              key={header.id}
              className={`text-left text-xs font-medium text-muted-foreground h-11 px-4 ${
                index < headerGroup.headers.length - 1
                  ? "border-r border-border"
                  : ""
              }`}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

