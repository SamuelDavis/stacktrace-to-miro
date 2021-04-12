const margin = 10;
export function positionInline(a, b) {
  return {x: b.right + margin, y: b.y};
}
export function positionReturn(a, b) {
  return {x: b.right + margin, y: b.y};
}
export function positionInside(a, b) {
  return {
    y: b.y + a.height
  };
}
