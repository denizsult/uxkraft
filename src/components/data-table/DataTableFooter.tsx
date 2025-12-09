import { DataTablePagination } from "./DataTablePagination";
import type { DataTableFooterProps } from "@/types/datatable";

export function DataTableFooter<TData>({
  table,
}: DataTableFooterProps<TData>) {
  return <DataTablePagination table={table} />;
}

