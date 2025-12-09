import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


import type { FilterFn } from "@tanstack/react-table";

export const defaultGlobalFilterFn: FilterFn<any> = (row, _columnId, filterValue) => {
  const searchValue = String(filterValue).toLowerCase();

  // Search in all string values
  return Object.values(row.original as Record<string, unknown>).some((value) =>
    String(value).toLowerCase().includes(searchValue)
  );
};
