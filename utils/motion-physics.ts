export const clamp = (value: number, min = -1, max = 1) => Math.min(max, Math.max(min, value));
export const normalize = (value: number, start: number, size: number) => clamp((value - start) / Math.max(size, 1) * 2 - 1);
export const damp = (current: number, target: number, rate: number, dt: number) => target + (current - target) * Math.exp(-rate * dt);

export type Spring = { position: number; velocity: number };
/** Bounded integration avoids jumps after a suspended/background tab resumes. */
export function stepSpring(spring: Spring, target: number, dt: number, stiffness = 110, damping = 22) {
  const step = Math.min(dt, 1 / 30);
  spring.velocity += ((target - spring.position) * stiffness - spring.velocity * damping) * step;
  spring.position += spring.velocity * step;
  return spring.position;
}
export const wrapIndex = (index: number, count: number) => ((index % count) + count) % count;
