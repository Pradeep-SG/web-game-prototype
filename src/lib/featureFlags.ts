import { isFeatureEnabled } from '@/lib/posthog';

/**
 * Centralized list of feature flags. Add the flag here, gate the code on it,
 * flip it from PostHog. The default is what ships when PostHog is unreachable
 * or not initialized — pick the safest value.
 */
export const flags = {
  webgpuEnabled: { key: 'webgpu_enabled', default: false },
  ghostRaceEnabled: { key: 'ghost_race_enabled', default: false },
  newOnboarding: { key: 'new_onboarding', default: false },
} as const;

export type FlagName = keyof typeof flags;

export function getFlag(name: FlagName): boolean {
  const flag = flags[name];
  const remote = isFeatureEnabled(flag.key);
  return remote ?? flag.default;
}
