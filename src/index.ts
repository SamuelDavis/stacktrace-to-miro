import parseStackTrace from "./traceProcessor";
import buildStackTrace from "./miroBuilder";

async function main() {
  const input = prompt("Stacktrace:");
  const stackTrace = parseStackTrace(input);
  const widgets = await buildStackTrace(stackTrace);

  await miro.board.viewport.zoomToObject(widgets[0]);
}

window.document.addEventListener("readystatechange", () => {
  if (window.document.readyState === "complete") {
    miro.onReady(() => {
      miro.initialize({
        extensionPoints: {
          bottomBar: {
            title: "Stacktrace to Miro",
            svgIcon:
              '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
            onClick: main,
          },
        },
      });
    });
  }
});
