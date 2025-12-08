import { RouterProvider } from 'react-router-dom';

import { AppProvider } from './providers';
import { createRouter } from './routes';

const router = createRouter();

export const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

