export function isClickInsideHUDElement(
  event: MouseEvent,
  bounds: { x: number; y: number; width: number; height: number },
): boolean {
  return (
    event.clientX >= bounds.x &&
    event.clientX <= bounds.x + bounds.width &&
    event.clientY >= bounds.y &&
    event.clientY <= bounds.y + bounds.height
  );
}
