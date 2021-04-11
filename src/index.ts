import parseStackTrace from "./traceProcessor";

function onClick() {
  const input = prompt("Stacktrace:");
  const stackTrace = parseStackTrace(input);

  console.log(stackTrace);
}

window.document.addEventListener("readystatechange", () => {
  if (window.document.readyState === "complete") {
    miro.onReady(() => {
      miro.initialize({
        extensionPoints: {
          bottomBar: {
            title: "Some title",
            svgIcon:
              '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>',
            onClick,
          },
        },
      });
    });
  }
});
