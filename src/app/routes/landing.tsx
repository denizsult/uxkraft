import { ItemsTable } from "@/features/items";

export const LandingRoute = () => {
  return (
    <div className="p-6">
      <div className="inline-flex flex-col items-start gap-2 px-6 py-5 relative bg-white rounded-sm border border-solid border-[#ededed]">
        <ItemsTable />
      </div>
    </div>
  );
};
