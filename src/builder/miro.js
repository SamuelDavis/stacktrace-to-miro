import {APP_ID} from "../env.js";
export async function createWidget(config) {
  const [widget] = await miro.board.widgets.create(config);
  return widget;
}
export async function positionWidget(widget, previous) {
  const [prev2, prev1] = previous;
  const point = buildPoint(widget, prev1, prev2);
  const [updatedWidget] = await miro.board.widgets.update({
    id: widget.id,
    bounds: {
      ...widget.bounds,
      ...point
    }
  });
  return updatedWidget;
}
const margin = 10;
function buildPoint(widget, prev1 = null, prev2 = null) {
  if (prev1 === null)
    return {x: 0, y: 0};
  const curLevel = widget.metadata[APP_ID].trace.level;
  const prevLevel = prev1.metadata[APP_ID].trace.level;
  if (curLevel > prevLevel)
    return positionInside(widget.bounds, prev1.bounds);
  if (curLevel < prevLevel)
    return positionReturn(widget.bounds, (prev2 ?? prev1).bounds);
  return positionInline(widget.bounds, prev1.bounds);
}
function positionInline(a, b) {
  return {x: b.right + margin, y: b.y};
}
function positionReturn(a, b) {
  return {x: b.right + margin, y: b.y};
}
function positionInside(a, b) {
  return {x: b.right + margin, y: b.y + a.height};
}
