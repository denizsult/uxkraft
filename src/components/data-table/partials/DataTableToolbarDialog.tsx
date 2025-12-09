import type { Table } from "@tanstack/react-table";
import { RenderIf } from "@/components/render-if";
import type { BulkAction } from "@/types/datatable";
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

interface DataTableToolbarDialogProps<TData> {
  table: Table<TData>;
  bulkActionDialog: {
    action: BulkAction<TData>;
    isOpen: boolean;
  } | null;
  onClose: () => void;
  onConfirm: () => void;
}

export function DataTableToolbarDialog<TData>({
  table,
  bulkActionDialog,
  onClose,
  onConfirm,
}: DataTableToolbarDialogProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <RenderIf condition={bulkActionDialog}>
      <AlertDialog
        open={bulkActionDialog?.isOpen}
        onOpenChange={(open) => !open && onClose()}
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
              onClick={onConfirm}
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
  );
}
