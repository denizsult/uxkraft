import { useMemo, useCallback } from "react";
import type { DataTableConfig, BulkAction } from "@/components/data-table";
import type { FilterFn, Table } from "@tanstack/react-table";
import type { Item } from "@/types/item";
import { DataTable } from "@/components/data-table";
import { useBulkEditSheet } from "@/stores/bulk-edit-sheet";
import { useUpdateTrackingSheet } from "@/stores/update-tracking-sheet";
import { useGetItems, useDownloadCSV } from "../../api";
import { ItemsTableFilters } from "./items-table-filters";
import { itemsTableColumns } from "../../config";
import { BulkEditSheet, ItemDetailSheet, UpdateTrackingSheet } from "../sheets";
import { globalFilterFn } from "@/utils/datatable";
import { toast } from "sonner";

export const ItemsTable = () => {
  const { data, isLoading, isFetching } = useGetItems();

  const { open: openBulkEdit } = useBulkEditSheet();
  const { open: openUpdateTracking } = useUpdateTrackingSheet();
  const { mutateAsync: downloadCSV } = useDownloadCSV();

  const handleCSVDownload = useCallback(() => {
    toast.promise(downloadCSV({}), {
      loading: "Downloading CSV...",
      success: "CSV downloaded successfully",
      error: "Failed to download CSV. Please try again.",
    });
  }, [downloadCSV]);

  // Extract unique phases and vendors for filter options
  const phaseOptions = useMemo(() => {
    const phases = new Set(data?.map((item) => item.phase));
    return Array.from(phases).sort();
  }, [data]);

  const vendorOptions = useMemo(() => {
    const vendors = new Set(data?.map((item) => item.ship_from));
    return Array.from(vendors).sort();
  }, [data]);

  const bulkActions: BulkAction<Item>[] = useMemo(
    () => [
      {
        label: "Bulk Edit",
        iconUrl: "/icons/bulk-edit.svg",
        onClick: async (selectedRows) => {
          openBulkEdit(selectedRows);
        },
        skipConfirmation: true,
      },
      {
        label: "Update Tracking",
        iconUrl: "/icons/bulk-edit.svg",
        onClick: async (selectedRows) => {
          openUpdateTracking(selectedRows);
        },
        skipConfirmation: true,
      },
      {
        label: "Create PO",
        iconUrl: "/icons/create-po.svg",
        onClick: async (selectedRows) => {
          console.log("Create PO:", selectedRows);
          // Implement create PO logic
        },
      },
      {
        label: "Delete",
        iconUrl: "/icons/delete.svg",
        variant: "destructive",
        onClick: async (selectedRows) => {
          console.log("Delete:", selectedRows);
          // Implement delete logic
        },
      },
    ],
    [openBulkEdit, openUpdateTracking]
  );

  const filters = useMemo(
    () => (table: Table<Item>) =>
      (
        <ItemsTableFilters
          table={table}
          phaseOptions={phaseOptions}
          vendorOptions={vendorOptions}
          onCSVDownload={handleCSVDownload}
        />
      ),
    [phaseOptions, vendorOptions, handleCSVDownload]
  );

  const config: DataTableConfig<Item> = useMemo(
    () => ({
      columns: itemsTableColumns,
      globalFilterFn: globalFilterFn as FilterFn<Item>,
      searchPlaceholder: "Find by Item Name, Item # or Spec #",
      bulkActions,
      initialPageSize: 5,
      enableRowSelection: true,
    }),
    [bulkActions]
  );

  return (
    <section className="flex flex-col gap-3 w-full">
      <header className="flex items-center gap-3 w-full">
        <h1 className="flex-1  font-semibold text-content text-2xl  leading-8">
          Items
        </h1>
      </header>
      <DataTable
        data={data || []}
        config={config}
        isLoading={isLoading || isFetching}
        filters={filters}
      />
      <ItemDetailSheet />
      <BulkEditSheet />
      <UpdateTrackingSheet />
    </section>
  );
};
