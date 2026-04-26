import { useEffect, useRef } from 'react';
import { createScene } from '@/scene/scene';

export function SceneCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const handle = createScene(canvas);
    return () => handle.dispose();
  }, []);

  return <canvas ref={ref} data-testid="ember-canvas" className="absolute inset-0 h-full w-full" />;
}
