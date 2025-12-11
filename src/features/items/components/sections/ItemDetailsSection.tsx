import { DownloadIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Item } from "@/types/item";
import { formatCurrency } from "@/utils/format";

type ItemDetailsSectionProps = {
  item: Item;
};

const tableHeaders = [
  { label: "Description", width: "flex-1" },
  { label: "Price", width: "w-[110px]" },
  { label: "Markup", width: "w-[68px]" },
  { label: "Unit Price", width: "w-[110px]" },
  { label: "Qty", width: "w-[45px]" },
  { label: "Unit", width: "w-[60px]" },
];

export const ItemDetailsSection = ({
  item,
}: ItemDetailsSectionProps) => {
  const infoFields = [
    {
      label: "Spec #",
      value: item.spec_number || "-",
      col: "col-[1_/_2]",
      row: "row-[1_/_2]",
    },
    {
      label: "Vendor",
      value: item.ship_from || "-",
      col: "col-[2_/_3]",
      row: "row-[1_/_2]",
    },
    {
      label: "Phase",
      value: item.phase || "-",
      col: "col-[3_/_4]",
      row: "row-[1_/_2]",
    },
    {
      label: "Ship to",
      value: item.ship_to || "-",
      subValue: "123 Sunshine Blvd, Miami, FL",
      col: "col-[1_/_2]",
      row: "row-[2_/_3]",
    },
    {
      label: "Ship From",
      value: item.ship_from || "-",
      col: "col-[2_/_3]",
      row: "row-[2_/_3]",
    },
    {
      label: "Notes for this item",
      value: item.item_notes || "-",
      col: "col-[3_/_4]",
      row: "row-[2_/_3]",
    },
    {
      label: "Location",
      value: item.location || "-",
      col: "col-[1_/_2]",
      row: "row-[3_/_4]",
    },
    {
      label: "Category",
      value: item.category || "-",
      col: "col-[2_/_3]",
      row: "row-[3_/_4]",
    },
  ];

  const priceNumber = parseFloat(item.price);
  const unitPrice = priceNumber / item.qty;
  const markup = ((priceNumber - unitPrice) / unitPrice) * 100;

  const productData = {
    description:
      "Brand: Harmony Home, TextilesModel: Serenity Collection, \nSummary: Harmony's Serenity Collection curtains combine luxury and elegance. Designed with high-quality fabrics, these curtains stand out with their graceful patterns and durability.",
    price: formatCurrency(unitPrice),
    markup: `${Math.round(markup)}%`,
    unitPrice: formatCurrency(priceNumber),
    qty: item.qty.toString(),
    unit: "each",
  };

  const totalPrice = priceNumber * item.qty;

  return (
    <section className="flex flex-col items-start gap-4 w-full">
      <Card className="w-full bg-white rounded-sm border border-solid border-slate-100">
        <CardContent className="flex flex-col items-start gap-5 p-5">
          <div className="grid grid-cols-3 grid-rows-3 h-[258px] gap-3 w-full max-w-[528px]">
            {infoFields.map((field, index) => (
              <div
                key={index}
                className={`${field.row} ${field.col} w-full h-fit flex flex-col items-start justify-center gap-2`}
              >
                <div className="w-[130px] font-medium text-muted-gray text-xs  leading-5">
                  {field.label}
                </div>
                <div className="flex items-center gap-1 w-full">
                  <div className="flex flex-col items-start justify-center flex-1">
                    <div className="flex  w-full h-6 font-medium text-content text-xs leading-6 whitespace-nowrap">
                      {field.value}
                    </div>
                    {field.subValue && (
                      <div className="flex items-center justify-center w-full h-4 font-normal text-muted-gray text-xs leading-4 whitespace-nowrap">
                        {field.subValue}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="row-[3_/_4] col-[3_/_4] w-full h-fit flex flex-col items-start gap-2">
              <div className="font-medium text-muted-gray text-xs  leading-5 w-full">
                Upload
              </div>
              <div className="flex h-[32.25px] items-center gap-3 w-full">
                <div className="flex flex-col items-start justify-center gap-0.5 flex-1">
                  <div className="flex h-5 items-center justify-between w-full">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-fit font-normal text-content text-xs  leading-5 whitespace-nowrap">
                        {item.spec_number || "N/A"} 2ND FLO...
                      </div>
                    </div>
                    <DownloadIcon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 w-full">
            <div className="flex flex-col items-start w-full bg-white rounded-sm border border-solid border-[#d8d8d8]">
              <div className="flex items-start w-full bg-[#f6f3f3] rounded-t-sm border-b border-solid border-[#d8d8d8]">
                {tableHeaders.map((header, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-start justify-center px-3 py-2.5 ${
                      header.width
                    } ${
                      index < tableHeaders.length - 1
                        ? "border-r border-solid border-[#d8d8d8]"
                        : ""
                    }`}
                  >
                    <div className="w-full font-medium text-muted-gray text-xs leading-5">
                      {header.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-start w-full">
                <div className="flex-1 flex flex-col items-start">
                  <div className="flex h-11 items-center px-3 py-1.5 w-full border-r border-solid border-[#eeeeee] gap-2.5">
                    <div className="flex-1 leading-normal line-clamp-2 overflow-hidden text-ellipsis font-normal text-content text-xs">
                      {productData.description}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-[110px] items-start">
                  <div className="flex h-11 items-center px-3 py-1.5 w-full border-r border-solid border-[#eeeeee] gap-2.5">
                    <div className="flex-1 h-6 font-normal text-content text-xs leading-6 whitespace-nowrap overflow-hidden text-ellipsis ">
                      {productData.price}
                    </div>
                  </div>
                </div>
                <div className="w-[68px] flex flex-col items-start">
                  <div className="flex h-11 items-center px-3 py-1.5 w-full border-r border-solid border-[#eeeeee] gap-2.5">
                    <div className="flex-1 h-6 font-normal text-content text-xs leading-6 whitespace-nowrap overflow-hidden text-ellipsis ">
                      {productData.markup}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-[110px] items-start">
                  <div className="flex h-11 items-center px-3 py-1.5 w-full border-r border-solid border-[#eeeeee] gap-2.5">
                    <div className="flex-1 h-6 text-right leading-6 whitespace-nowrap overflow-hidden text-ellipsis  font-normal text-content text-xs">
                      {productData.unitPrice}
                    </div>
                  </div>
                </div>
                <div className="w-[45px] flex flex-col items-start">
                  <div className="flex h-11 items-center px-3 py-1.5 w-full border-r border-solid border-[#eeeeee] gap-2.5">
                    <div className="flex-1 h-6 font-normal text-content text-xs leading-6 whitespace-nowrap overflow-hidden text-ellipsis ">
                      {productData.qty}
                    </div>
                  </div>
                </div>
                <div className="w-[60px] flex flex-col items-start">
                  <div className="flex h-11 items-center px-3 py-1.5 w-full gap-2.5">
                    <div className="w-fit leading-6 whitespace-nowrap font-normal text-content text-xs">
                      {productData.unit}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-8 items-center justify-end gap-3 px-3 py-0 w-full bg-input-bg rounded">
              <div className="w-fit flex items-center justify-center font-semibold text-content text-xs leading-normal">
                TOTAL PRICE
              </div>
              <div className="w-[100px] text-right flex items-center justify-center font-semibold text-content text-xs leading-normal">
                {formatCurrency(totalPrice)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

