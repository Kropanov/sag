import { LerpType } from '@/types';

// The lerp function calculates a normalized vector that points from
// the point (x0, y0) to the point (x1, y1). This vector has a length of 1.
function lerp(x0: number, y0: number, x1: number, y1: number, length: number = 1): LerpType {
  const dist = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
  return {
    x: ((x1 - x0) / dist) * length,
    y: ((y1 - y0) / dist) * length,
  };
}

export { lerp };
