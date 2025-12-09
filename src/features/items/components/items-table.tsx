import { useMemo } from "react";
import type { FilterFn, Table } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import type { DataTableConfig, BulkAction } from "@/components/data-table";
import { useItems } from "../api/get-items";
import type { Item } from "../types";
import { itemsTableColumns } from "../config";
import { ItemDetailSheet } from "./item-detail-sheet";
import { ItemsTableFilters } from "./items-table-filters";

const globalFilterFn: FilterFn<Item> = (row, _columnId, filterValue) => {
  const searchValue = String(filterValue).toLowerCase();
  const itemName = String(row.getValue("itemName")).toLowerCase();
  const itemNumber = String(row.getValue("itemNumber")).toLowerCase();
  const specNumber = String(row.getValue("specNumber")).toLowerCase();

  return (
    itemName.includes(searchValue) ||
    itemNumber.includes(searchValue) ||
    specNumber.includes(searchValue)
  );
};

export const ItemsTable = () => {
  const { data: itemsData, isLoading } = useItems();
  const data = itemsData?.data || [];

  // Extract unique phases and vendors for filter options
  const phaseOptions = useMemo(() => {
    const phases = new Set(data.map((item) => item.phase));
    return Array.from(phases).sort();
  }, [data]);

  const vendorOptions = useMemo(() => {
    const vendors = new Set(data.map((item) => item.vendor));
    return Array.from(vendors).sort();
  }, [data]);

  const bulkActions: BulkAction<Item>[] = useMemo(
    () => [
      {
        label: "Bulk Edit",
        iconUrl: "/icons/bulk-edit.svg",
        sheetComponent: (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Bulk Edit</h2>
            <p>Bulk Edit functionality will be implemented here.</p>
          </div>
        ),
      },
      {
        label: "Update Tracking",
        iconUrl: "/icons/bulk-edit.svg",
        sheetComponent: (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Update Tracking</h2>
            <p>Update Tracking functionality will be implemented here.</p>
          </div>
        ),
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
    []
  );

  const filters = useMemo(
    () => (table: Table<Item>) =>
      (
        <ItemsTableFilters
          table={table}
          phaseOptions={phaseOptions}
          vendorOptions={vendorOptions}
          onImportClick={() => {
            console.log("Import clicked");
            // Implement import logic
          }}
        />
      ),
    [phaseOptions, vendorOptions]
  );

  const config: DataTableConfig<Item> = useMemo(
    () => ({
      columns: itemsTableColumns,
      globalFilterFn,
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
        <h1 className="flex-1 [font-family:'Inter',Helvetica] font-semibold text-[#271716] text-2xl tracking-[0.20px] leading-8">
          Items
        </h1>
      </header>
      <DataTable
        data={data}
        config={config}
        isLoading={isLoading}
        filters={filters}
      />
      <ItemDetailSheet />
    </section>
  );
};
