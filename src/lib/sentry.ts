import * as Sentry from '@sentry/react';
import { env, hasSentry } from '@/lib/env';

let initialized = false;

export function initSentry(): void {
  if (initialized || !hasSentry()) return;
  Sentry.init({
    dsn: env.sentryDsn,
    environment: env.sentryEnvironment,
    release: env.buildSha,
    tracesSampleRate: env.isProd ? 0.1 : 1.0,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    integrations: [],
  });
  initialized = true;
}

export const captureException = (err: unknown): void => {
  if (initialized) Sentry.captureException(err);
  else console.error(err);
};
