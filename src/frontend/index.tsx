import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { App } from '#/frontend/app';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <StrictMode>
    <MantineProvider withNormalizeCSS>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
);
