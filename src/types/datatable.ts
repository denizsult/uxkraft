import type { ReactNode } from "react";
import type { FilterFn, ColumnDef, Table as TableType } from "@tanstack/react-table";

export type BulkAction<TData> = {
  label: string;
  icon?: ReactNode;
  iconUrl?: string;
  onClick?: (selectedRows: TData[]) => void | Promise<void>;
  variant?: "default" | "destructive";
  disabled?: (selectedRows: TData[]) => boolean;
  sheetComponent?: ReactNode;
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
  bulkActions?: BulkAction<TData>[];
  initialPageSize?: number;
  enableRowSelection?: boolean;
  showSearch?: boolean;
};

export type DataTableProps<TData> = {
  data: TData[];
  config: DataTableConfig<TData>;
  isLoading?: boolean;
  className?: string;
  filters?: (table: TableType<TData>) => ReactNode;
};

export interface DataTableBodyProps<TData> {
  table: TableType<TData>;
  columnsCount: number;
}

export interface DataTableHeaderProps<TData> {
  table: TableType<TData>;
}

export interface DataTableFooterProps<TData> {
  table: TableType<TData>;
}

export interface DataTablePaginationProps<TData> {
  table: TableType<TData>;
}

export interface DataTableToolbarProps<TData> {
  table: TableType<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  searchPlaceholder?: string;
  bulkActions?: BulkAction<TData>[];
  filters?: ReactNode;
  showSearch?: boolean;
}
