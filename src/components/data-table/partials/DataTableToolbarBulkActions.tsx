import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { RenderIf } from "@/components/render-if";
import type { BulkAction } from "@/types/datatable";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DataTableToolbarBulkActionsProps<TData> {
  table: Table<TData>;
  bulkActions: BulkAction<TData>[];
  onBulkActionClick: (action: BulkAction<TData>) => void;
}

export function DataTableToolbarBulkActions<TData>({
  table,
  bulkActions,
  onBulkActionClick,
}: DataTableToolbarBulkActionsProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const hasSelection = selectedRows.length > 0;

  if (!hasSelection || bulkActions.length === 0) {
    return null;
  }

  return (
    <div className="inline-flex h-8 items-center gap-3">
      <div className=" font-medium text-content text-xs  leading-5 whitespace-nowrap">
        {selectedRows.length} items selected
      </div>
      <div className="inline-flex items-start gap-2">
        {bulkActions.map((action, index) => {
          const selectedData = selectedRows.map((row) => row.original);
          const isDisabled =
            !hasSelection || (action.disabled?.(selectedData) ?? false);

          // If action has sheetComponent, wrap in Sheet
          if (action.sheetComponent) {
            return (
              <Sheet key={index}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-6 gap-1 p-1 rounded-sm shadow-elevations-unstroked-depth-1 h-auto"
                    disabled={isDisabled}
                  >
                    <RenderIf condition={action.iconUrl}>
                      <img
                        className="w-4 h-4"
                        alt={action.label}
                        src={action.iconUrl}
                      />
                    </RenderIf>
                    <RenderIf condition={action.icon}>
                      <span className="w-4 h-4">{action.icon}</span>
                    </RenderIf>
                    <span
                      className={` font-medium text-xs  leading-4 whitespace-nowrap ${
                        action.variant === "destructive"
                          ? "text-[#ca0018]"
                          : "text-[#302e2e]"
                      }`}
                    >
                      {action.label}
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[600px] sm:max-w-[600px] p-0"
                >
                  {action.sheetComponent}
                </SheetContent>
              </Sheet>
            );
          }

          // Regular button for actions without sheet
          return (
            <Button
              key={index}
              variant="ghost"
              className="h-6 gap-1 p-1 rounded-sm shadow-elevations-unstroked-depth-1 h-auto"
              disabled={isDisabled}
              onClick={() => onBulkActionClick(action)}
            >
              <RenderIf condition={action.iconUrl}>
                <img
                  className="w-4 h-4"
                  alt={action.label}
                  src={action.iconUrl}
                />
              </RenderIf>
              <RenderIf condition={action.icon}>
                <span className="w-4 h-4">{action.icon}</span>
              </RenderIf>
              <span
                className={` font-medium text-xs  leading-4 whitespace-nowrap ${
                  action.variant === "destructive"
                    ? "text-[#ca0018]"
                    : "text-[#302e2e]"
                }`}
              >
                {action.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
