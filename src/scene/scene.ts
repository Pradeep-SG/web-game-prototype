import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

export interface SceneHandle {
  dispose: () => void;
}

export function createScene(canvas: HTMLCanvasElement): SceneHandle {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  const scene = new Scene();
  scene.background = new Color(0x0b0a14);

  const camera = new PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.set(0, 1.2, 3.5);
  camera.lookAt(0, 0, 0);

  const ambient = new AmbientLight(0x6a5acd, 0.35);
  scene.add(ambient);

  const key = new DirectionalLight(0xff7a1a, 1.4);
  key.position.set(2.5, 3, 2);
  key.castShadow = true;
  scene.add(key);

  const cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshStandardMaterial({
      color: 0xf3eee0,
      roughness: 0.45,
      metalness: 0.15,
    }),
  );
  cube.castShadow = true;
  scene.add(cube);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  let raf = 0;
  let last = performance.now();
  const tick = (now: number) => {
    const dt = (now - last) / 1000;
    last = now;
    cube.rotation.x += dt * 0.6;
    cube.rotation.y += dt * 0.9;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  const onLost = (e: Event) => {
    e.preventDefault();
    cancelAnimationFrame(raf);
  };
  const onRestored = () => {
    last = performance.now();
    raf = requestAnimationFrame(tick);
  };
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onRestored);

  return {
    dispose: () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      cube.geometry.dispose();
      cube.material.dispose();
      renderer.dispose();
    },
  };
}
