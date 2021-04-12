export enum TraceType {
  ENTRY = "0",
  EXIT = "1",
  RETURN = "R",
}

export type RawTrace =
  | [
      string,
      string,
      "0",
      string,
      string,
      string,
      "1" | "0",
      string,
      string,
      string,
      string,
      ...string[]
    ]
  | [string, string, "1", string, string]
  | [string, string, "R", "", "", string];

export type Trace = EntryType | ExitType | ReturnType;

type RecordType = {
  level: number;
  fnNum: number;
};

export type ReturnType = RecordType & {
  returnValue: any;
};

export type ExitType = RecordType & {
  timeIndex: number;
  memoryUsage: number;
};

export type EntryType = ExitType & {
  fnName: string;
  userDefined: boolean;
  file: string;
  filename: string;
  line: number;
  argc: number;
  argv: any[];
};

export function isEntry(trace: Trace): trace is EntryType {
  return trace.hasOwnProperty("argv");
}

export function isExit(trace: Trace): trace is ExitType {
  return !isEntry(trace) && trace.hasOwnProperty("timeIndex");
}

export function isReturn(trace: Trace): trace is ReturnType {
  return trace.hasOwnProperty("returnValue");
}

export type TraceState = Partial<ReturnType & ExitType & EntryType>;

export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export type Widget = object & {
  id: string;
  bounds: Bounds;
};
