import { useMemo } from "react";
import type { FilterFn } from "@tanstack/react-table";
import { Edit3, RefreshCw, FileText, Trash2, Download } from "lucide-react";

import { DataTable } from "@/components/data-table";
import type { DataTableConfig, BulkAction, ToolbarAction } from "@/components/data-table";
import { useItems } from "../api/get-items";
import type { Item } from "../types";
import { itemsTableColumns } from "../config";

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

  const bulkActions: BulkAction<Item>[] = useMemo(
    () => [
      {
        label: "Bulk Edit",
        icon: <Edit3 className="h-4 w-4" />,
        onClick: async (selectedRows) => {
          console.log("Bulk Edit:", selectedRows);
          // Implement bulk edit logic
        },
      },
      {
        label: "Update Tracking",
        icon: <RefreshCw className="h-4 w-4" />,
        onClick: async (selectedRows) => {
          console.log("Update Tracking:", selectedRows);
          // Implement update tracking logic
        },
      },
      {
        label: "Create PO",
        icon: <FileText className="h-4 w-4" />,
        onClick: async (selectedRows) => {
          console.log("Create PO:", selectedRows);
          // Implement create PO logic
        },
      },
      {
        label: "Delete",
        icon: <Trash2 className="h-4 w-4" />,
        variant: "destructive",
        onClick: async (selectedRows) => {
          console.log("Delete:", selectedRows);
          // Implement delete logic
        },
      },
    ],
    []
  );

  const toolbarActions: ToolbarAction<Item>[] = useMemo(
    () => [
      {
        label: "Download",
        icon: <Download className="h-4 w-4" />,
        onClick: () => {
          console.log("Download clicked");
          // Implement download logic
        },
      },
    ],
    []
  );

  const config: DataTableConfig<Item> = useMemo(
    () => ({
      columns: itemsTableColumns,
      globalFilterFn,
      searchPlaceholder: "Find by Item Name, Item # or Spec #",
      toolbarActions,
      bulkActions,
      initialPageSize: 5,
      enableRowSelection: true,
    }),
    [toolbarActions, bulkActions]
  );

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Items</h1>
      <DataTable data={data} config={config} isLoading={isLoading} />
    </div>
  );
};
