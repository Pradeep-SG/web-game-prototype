import posthog from 'posthog-js';
import { env, hasPostHog } from '@/lib/env';

let initialized = false;

export function initPostHog(): void {
  if (initialized || !hasPostHog() || typeof window === 'undefined') return;
  posthog.init(env.posthogKey, {
    api_host: env.posthogHost,
    capture_pageview: true,
    autocapture: false,
    persistence: 'localStorage+cookie',
    loaded: (ph) => {
      ph.register({ build_sha: env.buildSha });
    },
  });
  initialized = true;
}

export function track(event: string, properties?: Record<string, unknown>): void {
  if (initialized) posthog.capture(event, properties);
}

export function isFeatureEnabled(flag: string): boolean | undefined {
  if (!initialized) return undefined;
  const value = posthog.isFeatureEnabled(flag);
  return typeof value === 'boolean' ? value : undefined;
}
