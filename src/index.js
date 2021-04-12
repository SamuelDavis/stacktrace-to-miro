import parseStackTrace from "./traceProcessor.js";
import {buildWidgets, positionWidgets} from "./builder/index.js";
async function main() {
  const input = prompt("Stacktrace:");
  const stackTrace = parseStackTrace(input);
  let widgets = await buildWidgets(stackTrace);
  widgets = await positionWidgets(widgets);
  await miro.board.viewport.set(widgets[0].bounds);
}
window.document.addEventListener("readystatechange", () => {
  if (window.document.readyState === "complete") {
    miro.onReady(() => {
      miro.initialize({
        extensionPoints: {
          bottomBar: {
            title: "Stacktrace to Miro",
            svgIcon: '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
            onClick: main
          }
        }
      });
    });
  }
});
