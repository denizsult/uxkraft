const createEnv = () => {
  const env = {
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    ENABLE_API_MOCKING: import.meta.env.VITE_ENABLE_API_MOCKING === 'true',
  };

  return env;
};

export const env = createEnv();

