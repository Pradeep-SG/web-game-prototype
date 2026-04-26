import { SceneCanvas } from '@/scene/SceneCanvas';
import { HUD } from '@/components/HUD';
import { MainMenu } from '@/components/MainMenu';
import { useMenuStore } from '@/state/menu';

export function App() {
  const isMenuOpen = useMenuStore((s) => s.isOpen);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <SceneCanvas />
      <HUD />
      {isMenuOpen && <MainMenu />}
    </div>
  );
}
