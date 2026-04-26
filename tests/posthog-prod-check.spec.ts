// User-requested ("option c"): verify in plain headless Chromium that
// PostHog event POSTs reach the api host from the production deploy,
// to rule out browser-side blocking on Pradeep's machine.
import { test, expect, type Request } from '@playwright/test';

test('posthog event POST reaches api host from clean chromium', async ({ browser }) => {
  test.skip(!process.env.PROBE_PROD, 'manual diagnostic; set PROBE_PROD=1 to run');
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  const events: Array<{ kind: string; url: string; status?: number; bodySize?: number }> = [];
  const isPosthog = (r: Request) => /posthog\.com/i.test(r.url());

  page.on('request', (r) => {
    if (isPosthog(r)) events.push({ kind: 'sent', url: r.url(), bodySize: r.postData()?.length });
  });
  page.on('requestfinished', async (r) => {
    if (isPosthog(r)) {
      const resp = await r.response();
      events.push({ kind: 'done', url: r.url(), status: resp?.status() });
    }
  });
  page.on('pageerror', (e) => console.log('[pageerror]', e.message));

  await page.goto('https://ember.pradeepsg2001.workers.dev/', {
    waitUntil: 'networkidle',
    timeout: 30_000,
  });
  await page.waitForTimeout(12_000); // generous: PostHog batch flush can take 10s
  await page.goto('about:blank');
  await page.waitForTimeout(3_000); // give sendBeacon time on unload

  const apiPosts = events.filter(
    (e) => /posthog\.com/.test(e.url) && !/-assets\./.test(e.url) && e.url.includes('/i/v0/e/'),
  );
  console.log('posthog-event-traffic:', JSON.stringify(apiPosts, null, 2));
  expect(apiPosts.length).toBeGreaterThan(0);
});
