import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env, hasSupabase } from '@/lib/env';
import { captureException } from '@/lib/sentry';

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (client) return client;
  if (!hasSupabase()) return null;
  client = createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return client;
}

/**
 * Phase 0 sanity check: writes a row to `heartbeats` so we can confirm the
 * client → Supabase path is alive end-to-end. Silently no-ops when env is
 * unconfigured (e.g. preview deploys without secrets).
 */
export async function heartbeat(): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  try {
    await sb.from('heartbeats').insert({
      build_sha: env.buildSha,
      user_agent: navigator.userAgent,
      url: window.location.href,
    });
  } catch (err) {
    captureException(err);
  }
}
