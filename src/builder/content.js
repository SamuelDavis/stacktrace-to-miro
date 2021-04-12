import {isEntry, isReturn} from "../types.js";
export function buildTextContent(trace) {
  if (isEntry(trace))
    return buildEntryText(trace);
  if (isReturn(trace))
    return buildReturnText(trace);
  return null;
}
function buildEntryText(trace) {
  const args = trace.argv.join(", ");
  return `(${trace.filename}:${trace.line}) ${trace.fnName}(${args})`;
}
function buildReturnText(trace) {
  return trace.returnValue;
}
