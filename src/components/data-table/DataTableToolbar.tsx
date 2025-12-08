import { useState } from "react";
import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { RenderIf } from "@/components/render-if";
import type { BulkAction, ToolbarAction } from "./DataTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  searchPlaceholder?: string;
  toolbarActions?: ToolbarAction<TData>[];
  bulkActions?: BulkAction<TData>[];
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  searchPlaceholder = "Search...",
  toolbarActions = [],
  bulkActions = [],
}: DataTableToolbarProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelection = selectedRows.length > 0;
  const [bulkActionDialog, setBulkActionDialog] = useState<{
    action: BulkAction<TData>;
    isOpen: boolean;
  } | null>(null);

  const handleBulkAction = (action: BulkAction<TData>) => {
    const selectedData = selectedRows.map((row) => row.original);
    const isDisabled = action.disabled?.(selectedData) ?? false;

    if (isDisabled) return;

    setBulkActionDialog({ action, isOpen: true });
  };

  const confirmBulkAction = async () => {
    if (!bulkActionDialog) return;

    const selectedData = selectedRows.map((row) => row.original);
    await bulkActionDialog.action.onClick(selectedData);
    table.resetRowSelection();
    setBulkActionDialog(null);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Search and Toolbar Actions Row */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-9 h-10 bg-card border-border"
            />
          </div>

          {toolbarActions.map((action, index) => {
            const isDisabled =
              typeof action.disabled === "function"
                ? action.disabled(table)
                : action.disabled ?? false;

            return (
              <Button
                key={index}
                variant={action.variant || "outline"}
                size="icon"
                className="h-10 w-10 bg-card"
                onClick={action.onClick}
                title={action.label}
                disabled={isDisabled}
              >
                {action.icon || <Search className="h-4 w-4" />}
              </Button>
            );
          })}
        </div>

        {/* Bulk Actions Row */}
        <RenderIf condition={bulkActions.length > 0}>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {hasSelection
                ? `${selectedRows.length} items selected`
                : "0 items selected"}
            </span>

            <div className="flex items-center gap-2">
              {bulkActions.map((action, index) => {
                const selectedData = selectedRows.map((row) => row.original);
                const isDisabled =
                  !hasSelection || (action.disabled?.(selectedData) ?? false);

                return (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-3 text-sm font-normal ${
                      action.variant === "destructive"
                        ? "text-destructive hover:text-destructive hover:bg-destructive/10"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    disabled={isDisabled}
                    onClick={() => handleBulkAction(action)}
                  >
                    <RenderIf condition={action.icon}>
                      <span className="mr-1.5">{action.icon}</span>
                    </RenderIf>
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </RenderIf>
      </div>

      {/* Bulk Action Confirmation Dialog */}
      <RenderIf condition={bulkActionDialog}>
        <AlertDialog
          open={bulkActionDialog?.isOpen}
          onOpenChange={(open) =>
            !open && setBulkActionDialog(null)
          }
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Action</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to perform this action on{" "}
                {selectedRows.length} selected item(s)? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmBulkAction}
                className={
                  bulkActionDialog?.action.variant === "destructive"
                    ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    : ""
                }
              >
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </RenderIf>
    </>
  );
}
