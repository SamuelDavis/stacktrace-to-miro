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
  funcNum: number;
};

type ReturnType = RecordType & {
  returnValue: any;
};

type ExitType = RecordType & {
  timeIndex: number;
  memoryUsage: number;
};

type EntryType = ExitType & {
  fnName: string;
  userDefined: boolean;
  file: string;
  filename: string;
  line: number;
  argc: number;
  argv: any[];
};
