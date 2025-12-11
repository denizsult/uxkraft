import { useExtendedMutation } from "@/hooks/use-extended-mutation";
import { api } from "@/lib/axios";
import type { MutationConfig } from "@/lib/react-query";

export const downloadCSV = async (_?: void): Promise<void> => {
  const response = await api.get("/items/export", {
    responseType: "blob",
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=items.csv",
    },
  });

  // Create blob from response
  const blob = new Blob([response.data], { type: "text/csv" });

  // Create download link
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `items-${new Date().toISOString().split("T")[0]}.csv`
  );

  // Trigger download
  document.body.appendChild(link);
  link.click();

  // Cleanup
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const useDownloadCSV = (config?: MutationConfig<typeof downloadCSV>) => {
  return useExtendedMutation({
    ...config,
    mutationFn: downloadCSV,
  });
};
