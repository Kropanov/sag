export function rectIntersect(
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number,
  anchorX1: number = 0.5,
  anchorY1: number = 0.5,
  anchorX2: number = 0.5,
  anchorY2: number = 0.5,
): boolean {
  const rect1 = {
    left: x1 - w1 * anchorX1,
    right: x1 + w1 * (1 - anchorX1),
    top: y1 - h1 * anchorY1,
    bottom: y1 + h1 * (1 - anchorY1),
  };

  const rect2 = {
    left: x2 - w2 * anchorX2,
    right: x2 + w2 * (1 - anchorX2),
    top: y2 - h2 * anchorY2,
    bottom: y2 + h2 * (1 - anchorY2),
  };

  return !(
    rect1.left > rect2.right ||
    rect1.right < rect2.left ||
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top
  );
}
