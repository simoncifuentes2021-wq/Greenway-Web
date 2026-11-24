import { clamp, damp, normalize, stepSpring } from '@/utils/motion-physics';

export type FlowMode = 'dormant' | 'awakening' | 'flowing' | 'connecting' | 'expanding' | 'digitizing' | 'completing';
export type FlowEvent = { type: 'section' | 'node' | 'cta' | 'activate' | 'drag-start' | 'drag-end' | 'technology' | 'cycle' | 'metric'; source?: Element; service?: string };
export type MotionFrame = {
  x: number; y: number; pointerX: number; pointerY: number; pointerEnergy: number;
  scrollVelocity: number; scrollDirection: number; scrollY: number; time: number; dt: number;
  reduced: boolean; quality: 'full' | 'balanced' | 'minimal'; fine: boolean; currentSection: string;
  flowMode: FlowMode; activeService: string | null;
};
export type SceneFrame = MotionFrame & { progress: number; rect: DOMRectReadOnly; visible: boolean };
type Scene = { element: Element; callback: (frame: SceneFrame) => void; rect: DOMRectReadOnly; visible: boolean; mode?: FlowMode; observer: IntersectionObserver };

/** One input sampler and demand-driven RAF for the entire route tree. No tracking/storage. */
export function createMotionEngine() {
  const state: MotionFrame = { x: 0, y: 0, pointerX: -10000, pointerY: -10000, pointerEnergy: 0, scrollVelocity: 0, scrollDirection: 0, scrollY: 0, time: 0, dt: 1 / 60, reduced: false, quality: 'balanced', fine: false, currentSection: '', flowMode: 'dormant', activeService: null };
  const scenes = new Set<Scene>();
  const events = new Set<(event: FlowEvent) => void>();
  const visited = new Set<string>();
  const sx = { position: 0, velocity: 0 }, sy = { position: 0, velocity: 0 };
  let targetX = 0, targetY = 0, energy = 0, velocity = 0;
  let frame = 0, lastFrame = 0, lastInput = 0, lastPointer = 0, lastScroll = 0, previousY = 0, mounted = false, dirty = true;
  let slowFrames = 0;
  let rendering = false;

  function emit(event: FlowEvent) {
    if (event.service) { state.activeService = event.service; visited.add(event.service); }
    events.forEach((listener) => listener(event));
    if (event.type !== 'section') { energy = Math.max(energy, .35); wake(); }
  }
  function render(time: number) {
    frame = 0;
    if (!mounted || document.hidden) return;
    const rawDt = lastFrame ? (time - lastFrame) / 1000 : 1 / 60;
    if (lastFrame && state.quality !== 'full' && rawDt < .03 && !state.reduced) { frame = requestAnimationFrame(render); return; }
    if (rawDt > .035 && state.quality === 'full' && ++slowFrames > 50) state.quality = 'balanced';
    state.dt = Math.min(rawDt, .05);
    rendering = true;
    state.time = time;
    lastFrame = time;
    if (time - lastPointer > 800) { targetX = 0; targetY = 0; }
    if (state.reduced) { sx.position = sy.position = sx.velocity = sy.velocity = 0; }
    state.x = state.reduced ? 0 : stepSpring(sx, targetX, state.dt);
    state.y = state.reduced ? 0 : stepSpring(sy, targetY, state.dt);
    energy = damp(energy, 0, 2.8, state.dt);
    velocity = damp(velocity, 0, 5, state.dt);
    state.pointerEnergy = state.reduced ? 0 : energy;
    state.scrollVelocity = state.reduced ? 0 : velocity;
    const visible = [...scenes].filter((scene) => scene.visible);
    if (dirty) {
      visible.forEach((scene) => { scene.rect = scene.element.getBoundingClientRect(); });
      const current = visible.filter((scene) => scene.mode).reduce<Scene | null>((best, scene) => !best || Math.abs(scene.rect.top + scene.rect.height / 2 - innerHeight / 2) < Math.abs(best.rect.top + best.rect.height / 2 - innerHeight / 2) ? scene : best, null);
      if (current) {
        const name = current.element.id || current.element.getAttribute('aria-labelledby') || current.element.tagName.toLowerCase();
        if (state.currentSection !== name) { state.currentSection = name; state.flowMode = current.mode!; emit({ type: 'section', source: current.element }); }
      }
      dirty = false;
    }
    visible.forEach((scene) => scene.callback({ ...state, visible: true, rect: scene.rect, progress: clamp((innerHeight - scene.rect.top) / (innerHeight + scene.rect.height), 0, 1) }));
    const unsettled = Math.abs(sx.position) + Math.abs(sy.position) + Math.abs(sx.velocity) + Math.abs(sy.velocity) + energy + Math.abs(velocity) > .003;
    rendering = false;
    if (!state.reduced && state.quality !== 'minimal' && visible.length && (time - lastInput < 1600 || unsettled)) frame = requestAnimationFrame(render);
  }
  function wake() {
    if (!mounted || document.hidden) return;
    lastInput = performance.now();
    if (!frame && !rendering) { lastFrame = 0; frame = requestAnimationFrame(render); }
  }
  function watch(element: Element, callback: Scene['callback'], mode?: FlowMode) {
    const scene = { element, callback, mode, rect: element.getBoundingClientRect(), visible: false } as Scene;
    scene.observer = new IntersectionObserver(([entry]) => {
      scene.visible = entry.isIntersecting;
      dirty = true;
      if (!scene.visible) callback({ ...state, rect: scene.rect, progress: 0, visible: false });
      wake();
    }, { rootMargin: '80px', threshold: [0, .2, .6] });
    scenes.add(scene);
    scene.observer.observe(element);
    return () => { scene.observer.disconnect(); scenes.delete(scene); };
  }
  function mount() {
    mounted = true;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const narrow = matchMedia('(max-width: 767px)');
    const capability = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const preference = () => {
      state.reduced = reduced.matches;
      state.fine = fine.matches;
      state.quality = capability.connection?.saveData || (capability.deviceMemory ?? 8) <= 2 || navigator.hardwareConcurrency <= 2 ? 'minimal' : narrow.matches || !fine.matches ? 'balanced' : 'full';
      dirty = true;
      wake();
    };
    const pointer = (event: PointerEvent) => {
      if (!state.fine || event.pointerType !== 'mouse' || state.reduced || state.quality === 'minimal') return;
      const now = performance.now();
      const elapsed = Math.max(now - lastPointer, 16);
      energy = clamp(Math.hypot(event.clientX - state.pointerX, event.clientY - state.pointerY) / elapsed / 2, 0, 1);
      state.pointerX = event.clientX; state.pointerY = event.clientY;
      targetX = normalize(event.clientX, 0, innerWidth); targetY = normalize(event.clientY, 0, innerHeight);
      lastPointer = now;
      wake();
    };
    const scroll = () => {
      const now = performance.now();
      const delta = window.scrollY - previousY;
      velocity = clamp(delta / Math.max(now - lastScroll, 16) / 3);
      state.scrollDirection = Math.sign(delta); state.scrollY = window.scrollY;
      previousY = state.scrollY; lastScroll = now; dirty = true; wake();
    };
    const resize = () => { dirty = true; wake(); };
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else { dirty = true; wake(); }
      scenes.forEach((scene) => scene.callback({ ...state, rect: scene.rect, progress: 0, visible: scene.visible && !document.hidden }));
    };
    const cta = (event: Event) => {
      const target = event.target instanceof Element ? event.target.closest('[data-flow-cta]') : null;
      if (target) emit({ type: event.type === 'click' ? 'activate' : 'cta', source: target });
    };
    previousY = window.scrollY; state.scrollY = previousY;
    preference();
    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('pointerover', cta); document.addEventListener('focusin', cta); document.addEventListener('click', cta);
    [reduced, fine, narrow].forEach((query) => query.addEventListener('change', preference));
    return () => {
      mounted = false; cancelAnimationFrame(frame); frame = 0;
      window.removeEventListener('pointermove', pointer); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('pointerover', cta); document.removeEventListener('focusin', cta); document.removeEventListener('click', cta);
      [reduced, fine, narrow].forEach((query) => query.removeEventListener('change', preference));
    };
  }
  return { state, visited, watch, mount, wake, emit, onEvent(listener: (event: FlowEvent) => void) { events.add(listener); return () => { events.delete(listener); }; } };
}
export type MotionEngine = ReturnType<typeof createMotionEngine>;
