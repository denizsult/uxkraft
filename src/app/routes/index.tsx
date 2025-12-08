import { createBrowserRouter } from 'react-router-dom';

import { AppRoot } from '../root';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <AppRoot />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { LandingRoute } = await import('./landing');
            return { Component: LandingRoute };
          },
        },
        {
          path: '/users',
          lazy: async () => {
            const { UsersRoute } = await import('@/features/users');
            return { Component: UsersRoute };
          },
        },
      ],
    },
  ]);

