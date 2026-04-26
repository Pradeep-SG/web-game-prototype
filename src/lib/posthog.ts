/**
 * Minimal PostHog client — POSTs events directly to /i/v0/e/.
 *
 * The official `posthog-js` package failed to fire events from our
 * production bundle (debug logs showed init succeeded, extensions
 * loaded, session ID generated, but no /i/v0/e/ POST ever left the
 * browser, including for explicit `posthog.capture()` calls). Rather
 * than chase a library bug, we send events directly. We trade away
 * feature flags, session recording, and autocapture, none of which
 * Phase 0 uses; we keep \$pageview tracking and a `track()` helper.
 */
import { env, hasPostHog } from '@/lib/env';

const DISTINCT_ID_KEY = 'ph_distinct_id';
let initialized = false;

function getDistinctId(): string {
  let id = localStorage.getItem(DISTINCT_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DISTINCT_ID_KEY, id);
  }
  return id;
}

function send(event: string, properties: Record<string, unknown> = {}): void {
  if (!hasPostHog()) return;
  const body = JSON.stringify({
    api_key: env.posthogKey,
    event,
    distinct_id: getDistinctId(),
    properties: {
      $current_url: window.location.href,
      $host: window.location.host,
      $pathname: window.location.pathname,
      $browser_language: navigator.language,
      $screen_width: window.screen.width,
      $screen_height: window.screen.height,
      build_sha: env.buildSha,
      ...properties,
    },
    timestamp: new Date().toISOString(),
  });
  void fetch(`${env.posthogHost}/i/v0/e/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  });
}

export function initPostHog(): void {
  if (initialized || !hasPostHog() || typeof window === 'undefined') return;
  initialized = true;
  send('$pageview');
}

export function track(event: string, properties?: Record<string, unknown>): void {
  if (initialized) send(event, properties);
}

export function isFeatureEnabled(_flag: string): boolean | undefined {
  return undefined;
}
