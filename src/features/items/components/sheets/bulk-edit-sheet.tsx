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
import { useBulkUpdateItems, type BulkUpdateItemsDto } from "../../api";
import { useForm } from "react-hook-form";

const formFields = [
  {
    id: "location",
    label: "Location",
    type: "select",
    value: "Bedroom",
    options: [
      "Bedroom",
      "Living Room",
      "Kitchen",
      "Bathroom",
      "Office",
      "Other",
    ],
  },
  {
    id: "category",
    label: "Category",
    type: "select",
    value: "Drapery",
    options: [
      "Drapery",
      "Window Treatments",
      "Bedroom",
      "Living Room",
      "Kitchen",
      "Bathroom",
      "Office",
      "Other",
    ],
  },
];
export const BulkEditSheet = () => {
  const { isOpen, close, selectedItems } = useBulkEditSheet();
  const {
    mutateAsync: bulkUpdateItemsMutation,
    isPending: isBulkUpdateItemsPending,
  } = useBulkUpdateItems({
    refetchQueries: ["useGetItems"],
    onSuccessMessage: "Bulk edit updated successfully",
    onErrorMessage: "Failed to update bulk edit",
  });

  const {
    getValues,
    setValue,
    reset,
    formState: { isDirty },
  } = useForm<BulkUpdateItemsDto>({
    defaultValues: {
      location: undefined,
      category: undefined,
      ship_from: undefined,
      ship_notes: undefined,
    },
  });

  const handleSave = async () => {
    const formValues = getValues();
    const data = {
      ...formValues,
      item_ids: selectedItems?.map((item) => item.id),
    };

    await bulkUpdateItemsMutation(data);
    handleClose();
  };

  const handleFieldChange = (field: string, value: string) => {
    setValue(field as keyof BulkUpdateItemsDto, value, { shouldDirty: true });
  };

  const handleClose = () => {
    reset(
      {
        location: undefined,
        category: undefined,
        ship_from: undefined,
        ship_notes: undefined,
      },
      { keepDirty: false }
    );
    close();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="right" className="w-[600px] sm:max-w-[600px] p-0">
        <SheetContainer>
          <SheetHeader
            title="Bulk Edit"
            subtitle={
              <>
                <span className="font-semibold text-content">
                  {selectedItems.length} items
                </span>
                <span className="font-light text-content">
                  {" "}
                </span>
                <span className="text-content">
                  will be updated
                </span>
              </>
            }
            onClose={handleClose}
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
                        <Select
                          defaultValue={field.value}
                          onValueChange={(value) =>
                            handleFieldChange(field.id, value)
                          }
                        >
                          <SelectTrigger
                            id={field.id}
                            className="h-[42px] w-full bg-input-bg border-input-border font-normal text-content text-xs  leading-6"
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
                      className="h-[42px] w-full bg-input-bg border-input-border font-normal text-content text-xs  leading-6"
                      defaultValue=""
                      onChange={(e) =>
                        handleFieldChange("ship_from", e.target.value)
                      }
                    />
                  </SheetFormField>
                  <SheetFormField
                    label="Notes for this item"
                    htmlFor="notes"
                    className="h-[68px] w-full"
                  >
                    <Input
                      id="notes"
                      className="h-[42px] w-full bg-input-bg border-input-border font-normal text-content text-xs  leading-6"
                      defaultValue=""
                      onChange={(e) =>
                        handleFieldChange("ship_notes", e.target.value)
                      }
                    />
                  </SheetFormField>
                </div>
              </SheetSection>
            </SheetCard>
          </main>
          <SheetFooter
            onCancel={handleClose}
            onSave={handleSave}
            isLoading={isBulkUpdateItemsPending}
            isSaveDisabled={!isDirty}
          />
        </SheetContainer>
      </SheetContent>
    </Sheet>
  );
};
