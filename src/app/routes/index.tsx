import { createBrowserRouter } from "react-router-dom";

import { AppRoot } from "../root";

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <AppRoot />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { LandingRoute } = await import("./landing");
            return { Component: LandingRoute };
          },
        },
        {
          path: "/items",
          lazy: async () => {
            const { ItemsRoute } = await import("@/features/items");
            return { Component: ItemsRoute };
          },
        },
      ],
    },
  ]);
