import { useMenuStore } from '@/state/menu';

export function HUD() {
  const toggle = useMenuStore((s) => s.toggle);

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 text-[var(--color-ember-ink)]">
      <header className="pointer-events-auto flex items-start justify-between">
        <div className="rounded-md bg-black/30 px-3 py-2 text-sm tracking-wide backdrop-blur-sm">
          <div className="text-xs uppercase opacity-60">Hearth</div>
          <div className="text-2xl font-semibold">000</div>
        </div>

        <button
          type="button"
          onClick={toggle}
          className="rounded-md bg-black/30 px-3 py-2 text-sm backdrop-blur-sm transition hover:bg-black/40"
        >
          Menu
        </button>
      </header>

      <footer className="pointer-events-auto flex items-end justify-between text-xs opacity-70">
        <div data-testid="build-sha">build {import.meta.env.VITE_BUILD_SHA}</div>
        <div>v0.0.0 — Phase 0</div>
      </footer>
    </div>
  );
}
