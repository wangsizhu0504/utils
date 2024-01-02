export interface INumeralImplements {
  clone?: () => any;
  format?: (inputString: string, roundingFunction: (x: number) => number) => any;
  value?: () => any;
  input?: () => any;
  set?: (value: any) => any;
  add?: (value: any) => any;
  subtract?: (value: any) => any;
  multiply?: (value: any) => any;
  divide?: (value: any) => any;
  difference?: (value: any) => any;
}
