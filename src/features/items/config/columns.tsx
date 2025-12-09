import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useItemDetailSheet } from "@/stores/item-detail-sheet";
import type { Item } from "../types";

export const itemsTableColumns: ColumnDef<Item>[] = [
  {
    id: "select",
    meta: {
      headerClassName: "w-10 p-0",
      cellClassName: "w-10 p-0",
    },
    size: 10,
    header: ({ table }) => (
      <div className="flex items-center justify-center h-full px-3 py-2.5">
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
          className="w-4 h-4  border-[#e0e0e0] data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800 hover:data-[state=checked]:bg-blue-900"
        />
      </div>
    ),
    cell: ({ row }) => {
      const isSelected = row.getIsSelected();
      return (
        <div className="flex items-center justify-center h-full px-3 py-3.5">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label={isSelected ? "Deselect row" : "Select row"}
            className="w-4 h-4 border-[#e0e0e0] data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800 hover:data-[state=checked]:bg-blue-900"
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "itemNumber",
    meta: {
      headerClassName: "w-[74px]",
      cellClassName: "w-[74px]",
    },
    header: () => "Item#",
    cell: ({ row }) => row.getValue("itemNumber"),
  },
  {
    accessorKey: "specNumber",
    meta: {
      headerClassName: "w-[74px]",
      cellClassName: "w-[74px]",
    },
    header: () => "Spec #",
    cell: ({ row }) => row.getValue("specNumber"),
  },
  {
    accessorKey: "itemName",
    meta: {
      headerClassName: "w-[113.5px]",
      cellClassName: "w-[113.5px] text-[#8e2424]",
    },
    header: () => "Item Name",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div
          className="cursor-pointer text-[#8e2424]"
          onClick={() => useItemDetailSheet.getState().open(item)}
        >
          {row.getValue("itemName")}
        </div>
      );
    },
  },
  {
    accessorKey: "vendor",
    meta: {
      headerClassName: "w-[130px]",
      cellClassName: "w-[130px]",
    },
    header: () => "Vendor",
    cell: ({ row }) => row.getValue("vendor"),
    filterFn: (row, id, value) => {
      if (!value) return true;
      return row.getValue(id) === value;
    },
  },
  {
    accessorKey: "shipTo",
    meta: {
      headerClassName: "w-[103px]",
      cellClassName: "w-[103px]",
    },
    header: () => "Ship To",
    cell: ({ row }) => row.getValue("shipTo"),
  },
  {
    accessorKey: "qty",
    meta: {
      headerClassName: "w-[53px]",
      cellClassName: "w-[53px]",
    },
    header: () => "Qty",
    cell: ({ row }) => row.getValue("qty"),
  },
  {
    accessorKey: "phase",
    meta: {
      headerClassName: "w-[63px]",
      cellClassName: "w-[63px] h-11",
    },
    header: () => "Phase",
    cell: ({ row }) => (
      <Badge className="w-[30px] h-7 flex items-center justify-center px-2.5 py-1 bg-[#e0e0e0] hover:bg-[#e0e0e0] [font-family:'Inter',Helvetica] font-semibold text-[#544f4f] text-xs rounded-[3px]">
        {row.getValue("phase")}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "price",
    meta: {
      headerClassName: "w-[109px]",
      cellClassName: "w-[109px] text-right",
    },
    header: () => "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return formatted;
    },
  },
  {
    accessorKey: "shipNotes",
    meta: {
      headerClassName: "w-[113.5px]",
      cellClassName: "w-[113.5px] h-11 px-3 py-1.5",
    },
    header: () => "Ship Notes",
    cell: ({ row }) => (
      <div className="[display:-webkit-box] [-webkit-line-clamp:1] [-webkit-box-orient:vertical] overflow-hidden text-ellipsis [font-family:'Inter',Helvetica] font-normal text-[#271716] text-xs tracking-[0.20px]">
        {row.getValue("shipNotes")}
      </div>
    ),
  },
  {
    id: "actions",
    meta: {
      headerClassName: "w-[71px]",
      cellClassName: "w-[73px] h-[46px] px-3 py-1.5",
    },
    header: () => "Action",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto p-0 gap-2 hover:bg-transparent [font-family:'Inter',Helvetica] font-medium text-[#312e2e] text-xs tracking-[0.20px]"
          >
            Edit
            <ChevronDownIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
