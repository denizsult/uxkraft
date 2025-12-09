import { MainLayout } from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";

export const ItemsRoute = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Items</h1>
            <p className="text-muted-foreground">Manage your items</p>
          </div>
          <Button>Add Item</Button>
        </div>
      </div>
    </MainLayout>
  );
};
