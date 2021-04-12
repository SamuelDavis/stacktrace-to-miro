import {TraceType} from "./types.js";
function traceFactory(input) {
  const [level, funcNum, type] = input;
  if (type === TraceType.RETURN) {
    return {
      level: Number(level),
      fnNum: Number(funcNum),
      returnValue: input[5]
    };
  }
  const [timeIndex, memoryUsage] = input.slice(3);
  if (type === TraceType.EXIT) {
    return {
      level: Number(level),
      fnNum: Number(funcNum),
      timeIndex: Number(timeIndex),
      memoryUsage: Number(memoryUsage)
    };
  }
  if (type === TraceType.ENTRY) {
    const [
      fnName,
      userDefined,
      file,
      filename,
      line,
      argc,
      ...argv
    ] = input.slice(5);
    return {
      level: Number(level),
      fnNum: Number(funcNum),
      timeIndex: Number(timeIndex),
      memoryUsage: Number(memoryUsage),
      fnName,
      userDefined: Boolean(userDefined),
      file,
      filename,
      line: Number(line),
      argc: Number(argc),
      argv
    };
  }
  throw new Error(`Unrecognized type: ${type} (${JSON.stringify(input)})`);
}
export default function parseStackTrace(input) {
  return (input ?? "").trim().split("\n").filter(Boolean).map((line) => line.split("	")).map(traceFactory);
}
