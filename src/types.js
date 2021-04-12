export var TraceType;
(function(TraceType2) {
  TraceType2["ENTRY"] = "0";
  TraceType2["EXIT"] = "1";
  TraceType2["RETURN"] = "R";
})(TraceType || (TraceType = {}));
export function isEntry(trace) {
  return trace.hasOwnProperty("argv");
}
export function isExit(trace) {
  return !isEntry(trace) && trace.hasOwnProperty("timeIndex");
}
export function isReturn(trace) {
  return trace.hasOwnProperty("returnValue");
}
