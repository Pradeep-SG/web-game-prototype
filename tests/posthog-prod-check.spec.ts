// User-requested ("option c"): verify in plain headless Chromium that
// PostHog event POSTs reach the api host from the production deploy,
// to rule out browser-side blocking on Pradeep's machine.
import { test, expect, type Request } from '@playwright/test';

test('posthog event POST reaches api host from clean chromium', async ({ browser }) => {
  test.skip(!process.env.PROBE_PROD, 'manual diagnostic; set PROBE_PROD=1 to run');
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  const events: Array<{ kind: string; url: string; status?: number }> = [];
  const isPosthog = (r: Request) => /posthog\.com/i.test(r.url());

  page.on('request', (r) => {
    if (isPosthog(r)) events.push({ kind: 'sent', url: r.url() });
  });
  page.on('requestfinished', async (r) => {
    if (isPosthog(r)) {
      const resp = await r.response();
      events.push({ kind: 'done', url: r.url(), status: resp?.status() });
    }
  });
  page.on('console', (m) => {
    if (/posthog|capture|pageview/i.test(m.text())) {
      console.log(`[browser-${m.type()}] ${m.text()}`);
    }
  });
  page.on('pageerror', (e) => console.log('[browser-pageerror]', e.message));

  await page.goto('https://ember.pradeepsg2001.workers.dev/', {
    waitUntil: 'networkidle',
    timeout: 30_000,
  });
  await page.waitForTimeout(2_000);

  // Direct fetch from browser context — proves the ingest is reachable
  // from this Chromium instance (rules out network/firewall issues).
  const directIngest = await page.evaluate(async () => {
    const res = await fetch('https://us.i.posthog.com/i/v0/e/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: 'phc_q6orQ4rG2q68E935ozjxRQixoYcYhvtgoHohMtFut87v',
        event: 'claude_browser_probe',
        distinct_id: 'claude-test-' + Date.now(),
        properties: { from: 'page-context-fetch' },
      }),
    });
    return { ok: res.ok, status: res.status };
  });
  console.log('direct-ingest:', JSON.stringify(directIngest));

  // Inspect what the bundled posthog instance thinks about itself.
  const introspect = await page.evaluate(() => {
    const w = window as unknown as {
      __posthog?: {
        __loaded?: boolean;
        config?: { api_host?: string; token?: string };
        _request_queue?: unknown[];
        get_distinct_id?: () => string;
        capture?: (e: string) => void;
      };
    };
    const ph = w.__posthog;
    if (!ph) return { found: false };
    try {
      ph.capture?.('claude_manual_in_page');
    } catch (e) {
      return { found: true, captureError: String(e) };
    }
    return {
      found: true,
      loaded: ph.__loaded,
      apiHost: ph.config?.api_host,
      hasToken: Boolean(ph.config?.token),
      distinctId: ph.get_distinct_id?.(),
      queueLen: Array.isArray(ph._request_queue) ? ph._request_queue.length : 'n/a',
    };
  });
  console.log('posthog-introspection:', JSON.stringify(introspect, null, 2));

  await page.waitForTimeout(7_000);
  await page.goto('about:blank');
  await page.waitForTimeout(2_000);

  const apiPosts = events.filter(
    (e) => e.kind === 'done' && /posthog\.com/.test(e.url) && !/-assets\./.test(e.url),
  );
  console.log(
    'posthog-api-posts:',
    JSON.stringify(
      apiPosts.map((e) => ({ url: e.url, status: e.status })),
      null,
      2,
    ),
  );
  expect(apiPosts.length).toBeGreaterThan(0);
});
