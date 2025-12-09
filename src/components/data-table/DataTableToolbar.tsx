import { useState } from "react";
import type { BulkAction, DataTableToolbarProps } from "@/types/datatable";
import {
  DataTableToolbarSearch,
  DataTableToolbarFilters,
  DataTableToolbarBulkActions,
  DataTableToolbarDialog,
} from "./partials";

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  searchPlaceholder = "Search...",
  bulkActions = [],
  filters,
  showSearch = true,
}: DataTableToolbarProps<TData>) {
  const [bulkActionDialog, setBulkActionDialog] = useState<{
    action: BulkAction<TData>;
    isOpen: boolean;
  } | null>(null);

  const handleBulkAction = (action: BulkAction<TData>) => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedData = selectedRows.map((row) => row.original);
    const isDisabled = action.disabled?.(selectedData) ?? false;

    if (isDisabled) return;

    if (action.onClick && !action.sheetComponent) {
      // If action has skipConfirmation flag, call onClick directly
      if (action.skipConfirmation) {
        action.onClick(selectedData);
        return;
      }
      setBulkActionDialog({ action, isOpen: true });
    }
  };

  const confirmBulkAction = async () => {
    if (!bulkActionDialog) return;
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedData = selectedRows.map((row) => row.original);
    await bulkActionDialog.action?.onClick?.(selectedData);
    table.resetRowSelection();
    setBulkActionDialog(null);
  };

  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        {/* Search and Filter Row */}
        <div className="flex items-end gap-4 w-full">
          <DataTableToolbarSearch
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            searchPlaceholder={searchPlaceholder}
            showSearch={showSearch}
          />
          <DataTableToolbarFilters filters={filters} />
        </div>

        {/* Bulk Actions Row */}
        <DataTableToolbarBulkActions
          table={table}
          bulkActions={bulkActions}
          onBulkActionClick={handleBulkAction}
        />
      </div>

      {/* Bulk Action Confirmation Dialog */}
      <DataTableToolbarDialog
        table={table}
        bulkActionDialog={bulkActionDialog}
        onClose={() => setBulkActionDialog(null)}
        onConfirm={confirmBulkAction}
      />
    </>
  );
}
