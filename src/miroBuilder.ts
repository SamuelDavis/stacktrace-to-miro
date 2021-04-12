import { Bounds, isEntry, isReturn, Trace, TraceState, Widget } from "./types";

const margin = 10;

export default async function buildStackTrace(stacktrace: Trace[]) {
  let widgets: Widget[] = [];
  let state: TraceState = {};

  for (const i in stacktrace) {
    const trace = stacktrace[i];
    let text = null;
    let config = null;

    if (isEntry(trace))
      text = `(${trace.filename}:${trace.line}) ${
        trace.fnName
      }(${trace.argv.join(", ")})`;
    else if (isReturn(trace)) text = trace.returnValue;

    if (text) {
      config = buildWidget(`${i}: ${text}`);
      let widget = await addWidgetToBoard(config);
      widget = await positionWidget(widgets, widget, state, trace);
      widgets = [...widgets, widget];
    }

    state = Object.keys(trace).reduce(
      (acc, key) => ({ ...acc, [key]: trace[key] }),
      state
    );
  }

  let lines = [];
  let prev: Widget = null;
  for (const widget of widgets) {
    if (prev)
      lines.push(
        await addWidgetToBoard({
          type: "LINE",
          startWidgetId: prev.id,
          endWidgetId: widget.id,
        })
      );
    prev = widget;
  }

  return [...widgets, ...lines];
}

function buildWidget(text: string, extra?: object): Bounds & any {
  return {
    type: "text",
    text,
    x: 0,
    y: 0,
    ...extra,
  };
}

async function addWidgetToBoard(config: any) {
  const [widget] = await miro.board.widgets.create(config);

  return widget;
}

async function positionWidget(
  widgets: Widget[],
  widget: Widget,
  state: TraceState,
  trace: Trace
) {
  const { id, bounds } = widget;
  let { x: left, y: bottom, width, height } = bounds;

  if (widgets.length > 0) {
    const { bounds: curr } = widgets[widgets.length - 1];

    if (trace.level === state?.level) {
      left = curr.right + +width / 2 + margin;
      bottom = curr.bottom + height;
    } else if (trace.level > state?.level) {
      left = curr.right + width / 2 + margin;
      bottom = curr.bottom + height;
    } else if (trace.level < state?.level) {
      if (widgets.length > 1) {
        const { bounds: prev } = widgets[widgets.length - 2];
        left = prev.right + width / 2 + margin;
        bottom = prev.bottom + height;
      } else {
        left = 0;
        bottom = curr.bottom + height;
      }
    }
  } else {
    left = 0;
    bottom = 0;
  }

  const [updatedWidget] = await miro.board.widgets.update({
    id,
    x: left,
    y: bottom,
  });

  return updatedWidget;
}
