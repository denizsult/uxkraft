import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useItemDetailSheet } from "@/stores/item-detail-sheet";
import type { Item } from "../types";

export const itemsTableColumns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-muted-foreground/40"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-muted-foreground/40"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "itemNumber",
    header: "Item#",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.getValue("itemNumber")}</span>
    ),
  },
  {
    accessorKey: "specNumber",
    header: "Spec #",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.getValue("specNumber")}</span>
    ),
  },
  {
    accessorKey: "itemName",
    header: "Item Name",
    cell: ({ row }) => {
      const item = row.original;
      
      return (
        <span
          className="text-sm text-link hover:text-link-hover cursor-pointer"
          onClick={() => useItemDetailSheet.getState().open(item)}
        >
          {row.getValue("itemName")}
        </span>
      );
    },
  },
  {
    accessorKey: "vendor",
    header: "Vendor",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.getValue("vendor")}</span>
    ),
  },
  {
    accessorKey: "shipTo",
    header: "Ship To",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.getValue("shipTo")}</span>
    ),
  },
  {
    accessorKey: "qty",
    header: "Qty",
    cell: ({ row }) => (
      <span className="text-sm text-foreground">{row.getValue("qty")}</span>
    ),
  },
  {
    accessorKey: "phase",
    header: "Phase",
    cell: ({ row }) => (
      <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-2 text-xs font-medium rounded-[4px] border border-[hsl(220,13%,85%)] bg-[hsl(0,0%,100%)] text-foreground shadow-sm">
        {row.getValue("phase")}
      </span>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <span className="text-sm text-foreground">{formatted}</span>;
    },
  },
  {
    accessorKey: "shipNotes",
    header: "Ship Notes",
    cell: ({ row }) => (
      <span className="text-sm text-foreground truncate max-w-[120px] block">
        {row.getValue("shipNotes")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-sm font-normal">
            Edit
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit Item</DropdownMenuItem>
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

