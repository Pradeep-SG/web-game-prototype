export const env = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  posthogKey: import.meta.env.VITE_POSTHOG_KEY,
  posthogHost: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  sentryEnvironment: import.meta.env.VITE_SENTRY_ENVIRONMENT || 'development',
  buildSha: import.meta.env.VITE_BUILD_SHA || 'local-dev',
  isProd: import.meta.env.PROD,
} as const;

export function hasSupabase(): boolean {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}

export function hasPostHog(): boolean {
  return Boolean(env.posthogKey);
}

export function hasSentry(): boolean {
  return Boolean(env.sentryDsn);
}
