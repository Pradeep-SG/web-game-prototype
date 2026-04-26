import { useMenuStore } from '@/state/menu';

export function MainMenu() {
  const close = useMenuStore((s) => s.close);

  return (
    <div
      data-testid="main-menu"
      className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-md"
    >
      <div className="w-[min(420px,90vw)] rounded-2xl border border-white/10 bg-[var(--color-ember-coal)]/90 p-6 shadow-2xl">
        <h1 className="text-4xl font-semibold tracking-tight">
          Ember
          <span className="ml-2 align-middle text-sm font-normal opacity-50">phase 0</span>
        </h1>
        <p className="mt-2 text-sm opacity-70">
          A stylized web game. The hearth is cold; the loop is not yet defined.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={close}
            className="rounded-lg bg-[var(--color-ember-flame)] px-4 py-3 text-sm font-medium text-black transition hover:opacity-90"
          >
            Light the hearth
          </button>
          <button
            type="button"
            disabled
            className="rounded-lg border border-white/10 px-4 py-3 text-sm opacity-40"
          >
            Settings (soon)
          </button>
          <button
            type="button"
            disabled
            className="rounded-lg border border-white/10 px-4 py-3 text-sm opacity-40"
          >
            Leaderboards (Phase 5)
          </button>
        </div>
      </div>
    </div>
  );
}
