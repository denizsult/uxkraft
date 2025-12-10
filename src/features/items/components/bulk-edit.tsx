import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useBulkEditSheet } from "@/stores/bulk-edit-sheet";
import {
  SheetHeader,
  SheetFooter,
  SheetContainer,
  SheetCard,
  SheetFormField,
  SheetSection,
} from "@/components/sheet-layout";

export const BulkEditSheet = () => {
  const { isOpen, close, selectedItems } = useBulkEditSheet();

  const formFields = [
    {
      id: "location",
      label: "Location",
      type: "select",
      value: "Bedroom",
      options: ["Bedroom"],
    },
    {
      id: "category",
      label: "Category",
      type: "select",
      value: "Drapery",
      options: ["Drapery"],
    },
  ];

  const handleSave = () => {
    // TODO: Implement bulk update logic
    console.log("Saving bulk edit for items:", selectedItems);
    close();
  };

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent
        side="right"
        className="w-[600px] sm:max-w-[600px] p-0"
      >
        <SheetContainer>
          <SheetHeader
            title="Bulk Edit"
            subtitle={
              <>
                <span className="font-semibold text-content tracking-[0.02px]">
                  {selectedItems.length} items
                </span>
                <span className="font-light text-content tracking-[0.02px] leading-[0.1px]">
                  {" "}
                </span>
                <span className="text-content tracking-[0.02px] leading-[0.1px]">
                  will be updated
                </span>
              </>
            }
            onClose={close}
            bgTransparent
          />
          <main className="flex flex-col items-start gap-6 p-6 flex-1">
            <SheetCard contentClassName="gap-10">
              <SheetSection title="Items Details">
                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="flex items-start gap-6 w-full">
                    {formFields.map((field) => (
                      <SheetFormField
                        key={field.id}
                        label={field.label}
                        htmlFor={field.id}
                        className="h-[68px] flex-1"
                      >
                        <Select defaultValue={field.value}>
                          <SelectTrigger
                            id={field.id}
                            className="h-[42px] w-full bg-[#fcfcfc] border-[#e0e0e0] font-normal text-content text-xs tracking-[0] leading-6"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </SheetFormField>
                    ))}
                  </div>
                  <SheetFormField
                    label="Ship From"
                    htmlFor="shipFrom"
                    className="h-[68px] w-full"
                  >
                    <Input
                      id="shipFrom"
                      className="h-[42px] w-full bg-[#fcfcfc] border-[#e0e0e0] font-normal text-content text-xs tracking-[0] leading-6"
                      defaultValue=""
                    />
                  </SheetFormField>
                  <SheetFormField
                    label="Notes for this item"
                    htmlFor="notes"
                    className="h-[68px] w-full"
                  >
                    <Input
                      id="notes"
                      className="h-[42px] w-full bg-[#fcfcfc] border-[#e0e0e0] font-normal text-content text-xs tracking-[0] leading-6"
                      defaultValue=""
                    />
                  </SheetFormField>
                </div>
              </SheetSection>
            </SheetCard>
          </main>
          <SheetFooter onCancel={close} onSave={handleSave} />
        </SheetContainer>
      </SheetContent>
    </Sheet>
  );
};
