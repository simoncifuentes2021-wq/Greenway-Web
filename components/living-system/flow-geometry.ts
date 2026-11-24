import { clamp } from '@/utils/motion-physics';

export type FlowVariant = 'hero' | 'connection' | 'services' | 'impact' | 'technology' | 'footer';
const current = [-80,590,120,590,122,474,218,437,332,393,526,451,550,285,576,103,397,31,293,149,194,262,339,372,435,314,520,262,462,172,389,190,297,213,360,473,720,471];
function cycle() {
  const points: number[] = [];
  const rx = 218, ry = 184, step = Math.PI / 3, handle = 4 / 3 * Math.tan(step / 4);
  for (let i = 0; i < 6; i++) {
    const a = -.7 + i * step, b = a + step;
    const x = 320 + rx * Math.cos(a), y = 320 + ry * Math.sin(a);
    const nx = 320 + rx * Math.cos(b), ny = 320 + ry * Math.sin(b);
    if (!i) points.push(x, y);
    points.push(x - handle * rx * Math.sin(a), y + handle * ry * Math.cos(a), nx + handle * rx * Math.sin(b), ny - handle * ry * Math.cos(b), nx, ny);
  }
  return points;
}
const closed = cycle();
const circuit = [60,480,130,480,140,480,180,480,220,480,220,400,260,400,300,400,300,320,340,320,380,320,380,240,420,240,460,240,460,160,500,160,540,160,560,160,610,160];
export function flowGeometry(variant: FlowVariant, progress: number, energy = 0) {
  const closing = variant === 'footer' ? clamp(progress * 2.1, 0, 1) : variant === 'impact' ? .82 : variant === 'services' ? .48 : 0;
  const digitizing = variant === 'technology' ? clamp((progress - .12) * 2.1, 0, 1) : 0;
  return current.map((value, index) => {
    const circular = value + (closed[index] - value) * closing;
    return circular + (circuit[index] - circular) * digitizing + Math.sin(index * .71) * energy * 3 * (1 - closing);
  });
}
export function pathData(points: number[]) {
  return `M${points[0].toFixed(2)} ${points[1].toFixed(2)} ${Array.from({ length: 6 }, (_, index) => `C${points.slice(2 + index * 6, 8 + index * 6).map((point) => point.toFixed(2)).join(' ')}`).join(' ')}`;
}
export function pointOnFlow(points: number[], progress: number) {
  const step = Math.min(progress * 6, 5.9999), index = Math.floor(step), t = step - index, q = 1 - t;
  const start = index ? 2 + (index - 1) * 6 + 4 : 0;
  const offset = 2 + index * 6;
  const at = (axis: number) => q ** 3 * points[start + axis] + 3 * q ** 2 * t * points[offset + axis] + 3 * q * t ** 2 * points[offset + 2 + axis] + t ** 3 * points[offset + 4 + axis];
  return { x: at(0), y: at(1) };
}
