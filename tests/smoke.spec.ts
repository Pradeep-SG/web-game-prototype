import { test, expect } from '@playwright/test';

test('renders canvas and HUD on first paint', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('/');

  const canvas = page.getByTestId('ember-canvas');
  await expect(canvas).toBeVisible();

  await expect(page.getByTestId('main-menu')).toBeVisible();
  await expect(page.getByTestId('build-sha')).toContainText(/build /);

  await page.getByRole('button', { name: 'Light the hearth' }).click();
  await expect(page.getByTestId('main-menu')).toHaveCount(0);

  expect(consoleErrors.filter((e) => !/Sentry|posthog|Supabase/i.test(e))).toEqual([]);
});

test('canvas covers the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');
  const box = await page.getByTestId('ember-canvas').boundingBox();
  expect(box?.width).toBeGreaterThan(1200);
  expect(box?.height).toBeGreaterThan(700);
});
