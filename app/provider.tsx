'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProviderProps {
  children: React.ReactNode;
}

function Provider({ children }: ProviderProps) {
  //The query client manages the caching and fetching of data queries within your application.
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}

export default Provider;
