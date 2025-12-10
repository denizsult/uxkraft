import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnFiltersState,
} from "@tanstack/react-table";

import { Table as TableComponent } from "@/components/ui/table";
import { RenderIf } from "@/components/render-if";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { DataTableFooter } from "./DataTableFooter";
import { DataTableToolbar } from "./DataTableToolbar";
import { DataTableLoader } from "./DataTableLoader";
import type { DataTableProps } from "@/types/datatable";

export function DataTable<TData>({
  data,
  config,
  isLoading = false,
  className = "",
  filters,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const {
    columns,
    searchPlaceholder,
    bulkActions,
    initialPageSize = 5,
    enableRowSelection = true,
    showSearch = true,
  } = config;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    enableRowSelection,
    state: {
      rowSelection: enableRowSelection ? rowSelection : {},
      globalFilter,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
  });

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        searchPlaceholder={searchPlaceholder}
        bulkActions={bulkActions}
        filters={filters ? filters(table) : undefined}
        showSearch={showSearch}
      />

      <div className="rounded-sm border border-[#d8d8d8] overflow-hidden">
        <TableComponent>
          <DataTableHeader table={table} />
          <RenderIf condition={isLoading}>
            <DataTableLoader columnsCount={columns.length} />
          </RenderIf>
          <RenderIf condition={!isLoading}>
            <DataTableBody table={table} columnsCount={columns.length} />
          </RenderIf>
        </TableComponent>
      </div>

      <DataTableFooter table={table} />
    </div>
  );
}
