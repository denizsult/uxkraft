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
import { useForm, Controller } from "react-hook-form";

const formFields: Array<{
  id: keyof BulkUpdateItemsDto;
  label: string;
  options: string[];
}> = [
  {
    id: "location",
    label: "Location",
    options: ["Bedroom", "Living Room", "Kitchen", "Bathroom", "Office", "Other"],
  },
  {
    id: "category",
    label: "Category",
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
    isPending,
  } = useBulkUpdateItems({
    refetchQueries: ["useGetItems"],
    onSuccessMessage: "Bulk edit updated successfully",
    onErrorMessage: "Failed to update bulk edit",
  });

  const {
    control,
    register,
    handleSubmit,
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

  const handleClose = () => {
    reset();
    close();
  };

  const onSave = async (values: BulkUpdateItemsDto) => {
    await bulkUpdateItemsMutation({
      ...values,
      item_ids: selectedItems.map((i) => i.id),
    });

    handleClose();
  };

  // ✔ En temiz, en okunabilir form submit wrapper
  const onSubmit = handleSubmit(onSave);

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-[600px] sm:max-w-[600px] p-0"
      >
        <SheetContainer>
          <SheetHeader
            title="Bulk Edit"
            subtitle={
              <>
                <span className="font-semibold">{selectedItems.length} items</span>
                <span> will be updated</span>
              </>
            }
            onClose={handleClose}
            bgTransparent
          />

          <form onSubmit={onSubmit} className="flex flex-col flex-1 p-6">
            <SheetCard contentClassName="gap-10">
              <SheetSection title="Items Details">
                <div className="flex flex-col gap-4 w-full">
                  
                  {/* Location + Category */}
                  <div className="flex gap-6 w-full">
                    {formFields.map((field) => (
                      <SheetFormField
                        key={field.id}
                        label={field.label}
                        htmlFor={field.id}
                        className="flex-1 h-[68px]"
                      >
                        <Controller
                          control={control}
                          name={field.id}
                          render={({ field: ctrl }) => (
                            <Select value={ctrl.value as string} onValueChange={ctrl.onChange}>
                              <SelectTrigger
                                id={field.id}
                                className="h-[42px] text-xs bg-input-bg border-input-border"
                              >
                                <SelectValue placeholder={`Select ${field.label}`} />
                              </SelectTrigger>

                              <SelectContent>
                                {field.options.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </SheetFormField>
                    ))}
                  </div>

                  {/* Ship From */}
                  <SheetFormField
                    label="Ship From"
                    htmlFor="ship_from"
                    className="h-[68px] w-full"
                  >
                    <Input
                      id="ship_from"
                      {...register("ship_from")}
                      className="h-[42px] text-xs bg-input-bg border-input-border"
                    />
                  </SheetFormField>

                  {/* Notes */}
                  <SheetFormField
                    label="Notes for this item"
                    htmlFor="ship_notes"
                    className="h-[68px] w-full"
                  >
                    <Input
                      id="ship_notes"
                      {...register("ship_notes")}
                      className="h-[42px] text-xs bg-input-bg border-input-border"
                    />
                  </SheetFormField>
                </div>
              </SheetSection>
            </SheetCard>

            <SheetFooter
              onCancel={handleClose}
              onSave={onSubmit}        // ✔ En temiz kullanım
              isLoading={isPending}
              isSaveDisabled={!isDirty}
            />
          </form>
        </SheetContainer>
      </SheetContent>
    </Sheet>
  );
};
