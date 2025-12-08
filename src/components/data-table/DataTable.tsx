"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type FilterFn,
  type ColumnDef,
  type Table as TableType,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

import { Spinner } from "@/components/ui/spinner";
import { Table as TableComponent } from "@/components/ui/table";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { DataTableFooter } from "./DataTableFooter";
import { DataTableToolbar } from "./DataTableToolbar";

// Types
export type BulkAction<TData> = {
  label: string;
  icon?: ReactNode;
  onClick: (selectedRows: TData[]) => void | Promise<void>;
  variant?: "default" | "destructive";
  disabled?: (selectedRows: TData[]) => boolean;
};

export type ToolbarAction<TData> = {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost";
  disabled?: boolean | ((table: TableType<TData>) => boolean);
};

export type DataTableConfig<TData> = {
  columns: ColumnDef<TData>[];
  globalFilterFn?: FilterFn<TData>;
  searchPlaceholder?: string;
  toolbarActions?: ToolbarAction<TData>[];
  bulkActions?: BulkAction<TData>[];
  initialPageSize?: number;
  enableRowSelection?: boolean;
};

export type DataTableProps<TData> = {
  data: TData[];
  config: DataTableConfig<TData>;
  isLoading?: boolean;
  className?: string;
};

const defaultGlobalFilterFn: FilterFn<any> = (row, _columnId, filterValue) => {
  const searchValue = String(filterValue).toLowerCase();
  
  // Search in all string values
  return Object.values(row.original as Record<string, unknown>).some((value) =>
    String(value).toLowerCase().includes(searchValue)
  );
};

export function DataTable<TData>({
  data,
  config,
  isLoading = false,
  className = "",
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  const {
    columns,
    globalFilterFn = defaultGlobalFilterFn,
    searchPlaceholder,
    toolbarActions,
    bulkActions,
    initialPageSize = 5,
    enableRowSelection = true,
  } = config;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    enableRowSelection,
    state: {
      rowSelection: enableRowSelection ? rowSelection : {},
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className={`w-full max-w-[1000px] mx-auto p-6 bg-card rounded-lg shadow-sm border border-border ${className}`}>
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        searchPlaceholder={searchPlaceholder}
        toolbarActions={toolbarActions}
        bulkActions={bulkActions}
      />

      <div className="mt-4 overflow-hidden rounded-md border">
        <TableComponent>
          <DataTableHeader table={table} />
          <DataTableBody table={table} columnsCount={columns.length} />
        </TableComponent>
      </div>

      <DataTableFooter table={table} />
    </div>
  );
}
