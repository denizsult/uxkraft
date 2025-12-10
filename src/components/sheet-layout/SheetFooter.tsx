import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";

type SheetFooterProps = {
  onCancel: () => void;
  onSave: () => void;
  cancelLabel?: string;
  saveLabel?: string;
  isLoading?: boolean;
};

export const SheetFooter = ({
  onCancel,
  onSave,
  cancelLabel = "Cancel",
  saveLabel = "Save Changes",
  isLoading = false,
}: SheetFooterProps) => {
  return (
    <footer className="flex items-center gap-2 pt-4 pb-6 px-6 w-full rounded-sm">
      <SheetClose asChild>
        <Button
          variant="outline"
          className="w-[100px] h-10 border-[#8e2424] text-[#8e2424]  font-medium text-sm "
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelLabel}
        </Button>
      </SheetClose>
      <Button
        className="h-10 px-6 py-3 bg-[#8e2424] hover:bg-[#8e2424]/90 text-white font-medium text-sm  transition-colors"
        onClick={onSave}
        isLoading={isLoading}
      >
        {saveLabel}
      </Button>
    </footer>
  );
};
