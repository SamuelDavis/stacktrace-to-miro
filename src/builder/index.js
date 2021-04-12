import {buildTextContent} from "./content.js";
import {buildTextConfig} from "./config.js";
import {createWidget, positionWidget} from "./miro.js";
import {APP_ID} from "../env.js";
export async function buildWidgets(stacktrace) {
  return Promise.all(stacktrace.map((trace, i) => {
    const text = buildTextContent(trace);
    if (text === null)
      return null;
    const config = buildTextConfig(text);
    return createWidget({...config, metadata: {[APP_ID]: {trace}}});
  }).filter(Boolean));
}
export async function positionWidgets(widgets) {
  let positionedWidgets = [];
  for (let widget of widgets) {
    widget = await positionWidget(widget, positionedWidgets);
    positionedWidgets.push(widget);
  }
  return positionedWidgets;
}
