import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetClose } from "@/components/ui/sheet";
import { useBulkEditSheet } from "@/stores/bulk-edit-sheet";

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
        <div className="flex flex-col min-h-screen bg-[#f7f5f5] border border-solid border-[#e0e0e0]">
          <header className="flex items-start gap-5 pt-6 pb-4 px-6 w-full bg-transparent rounded-[4px_4px_2px_2px] relative">
            <div className="flex flex-col items-start gap-4 flex-1">
              <div className="flex flex-col items-start gap-2 w-full">
                <h1 className="[font-family:'Inter',Helvetica] font-medium text-[#1f0909] text-xl tracking-[0.20px] leading-8">
                  Bulk Edit
                </h1>
              </div>
              <p className="[font-family:'Inter',Helvetica] font-normal text-xs tracking-[0.20px] leading-3">
                <span className="font-semibold text-[#271716] tracking-[0.02px]">
                  {selectedItems.length} items
                </span>
                <span className="font-light text-[#271716] tracking-[0.02px] leading-[0.1px]">
                  &nbsp;
                </span>
                <span className="text-[#271716] tracking-[0.02px] leading-[0.1px]">
                  will be updated
                </span>
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-1 rounded-md absolute top-3 right-3"
              onClick={close}
            >
              <XIcon className="w-6 h-6" />
            </Button>
          </header>
          <main className="flex flex-col items-start gap-6 p-6 flex-1">
            <Card className="w-full bg-white">
              <CardContent className="flex flex-col items-start gap-10 p-6">
                <div className="flex flex-col items-start gap-6 w-full">
                  <div className="flex flex-col items-start gap-3 w-full">
                    <h2 className="[font-family:'Inter',Helvetica] font-semibold text-[#271716] text-sm tracking-[0.20px] leading-8">
                      Items Details
                    </h2>
                    <div className="flex flex-col items-start gap-4 w-full">
                      <div className="flex items-start gap-6 w-full">
                        {formFields.map((field) => (
                          <div
                            key={field.id}
                            className="flex flex-col h-[68px] items-start gap-2 flex-1"
                          >
                            <Label
                              htmlFor={field.id}
                              className="[font-family:'Inter',Helvetica] font-medium text-[#271716] text-xs tracking-[0.20px] leading-5"
                            >
                              {field.label}
                            </Label>
                            <Select defaultValue={field.value}>
                              <SelectTrigger
                                id={field.id}
                                className="h-[42px] w-full bg-[#fcfcfc] border-[#e0e0e0] [font-family:'Inter',Helvetica] font-normal text-[#271716] text-xs tracking-[0] leading-6"
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
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col h-[68px] items-start gap-2 w-full">
                        <Label
                          htmlFor="shipFrom"
                          className="[font-family:'Inter',Helvetica] font-medium text-[#271716] text-xs tracking-[0.20px] leading-5"
                        >
                          Ship From
                        </Label>
                        <Input
                          id="shipFrom"
                          className="h-[42px] w-full bg-[#fcfcfc] border-[#e0e0e0] [font-family:'Inter',Helvetica] font-normal text-[#271716] text-xs tracking-[0] leading-6"
                          defaultValue=""
                        />
                      </div>
                      <div className="flex flex-col h-[68px] items-start gap-2 w-full">
                        <Label
                          htmlFor="notes"
                          className="[font-family:'Inter',Helvetica] font-medium text-[#271716] text-xs tracking-[0.20px] leading-5"
                        >
                          Notes for this item
                        </Label>
                        <Input
                          id="notes"
                          className="h-[42px] w-full bg-[#fcfcfc] border-[#e0e0e0] [font-family:'Inter',Helvetica] font-normal text-[#271716] text-xs tracking-[0] leading-6"
                          defaultValue=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
          <footer className="flex items-center gap-2 pt-4 pb-6 px-6 w-full rounded-[2px_2px_4px_4px]">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-[100px] h-10 border-[#8e2424] text-[#8e2424] shadow-elevations-unstroked-depth-1 [font-family:'Inter',Helvetica] font-medium text-sm tracking-[0.20px]"
              >
                Cancel
              </Button>
            </SheetClose>
            <Button
              className="h-10 bg-[#8e2424] hover:bg-[#8e2424]/90 text-white shadow-elevations-unstroked-depth-1 [font-family:'Inter',Helvetica] font-medium text-sm tracking-[0.20px]"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </footer>
        </div>
      </SheetContent>
    </Sheet>
  );
};
