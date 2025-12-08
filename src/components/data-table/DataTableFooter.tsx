import type { Table } from "@tanstack/react-table";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableFooterProps<TData> {
  table: Table<TData>;
}

export function DataTableFooter<TData>({
  table,
}: DataTableFooterProps<TData>) {
  return <DataTablePagination table={table} />;
}

