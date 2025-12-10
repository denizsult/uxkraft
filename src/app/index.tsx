import { RouterProvider } from "react-router-dom";

import { AppProvider } from "./providers";
import { createRouter } from "./routes";
import { Toaster } from "sonner";

const router = createRouter();

export const App = () => {
  return (
    <AppProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </AppProvider>
  );
};
