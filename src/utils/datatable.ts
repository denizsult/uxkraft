 import type { FilterFn } from "@tanstack/react-table";

export const globalFilterFn: FilterFn<unknown> = (row, _columnId, filterValue) => {
    const searchValue = String(filterValue).toLowerCase();
    const itemName = String(row.getValue("item_name")).toLowerCase();
    const specNumber = String(row.getValue("spec_number") || "").toLowerCase();
  
    return itemName.includes(searchValue) || specNumber.includes(searchValue);
  };