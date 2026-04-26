import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App';
import { initSentry } from '@/lib/sentry';
import { initPostHog } from '@/lib/posthog';
import { heartbeat } from '@/lib/supabase';
import '@/styles/index.css';

initSentry();
initPostHog();

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('#root not found in index.html');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

void heartbeat();
