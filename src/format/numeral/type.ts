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

export interface NumeralLocales {
  [id: string]: NumeralLocale;
}

// http://numeraljs.com/#locales
export interface NumeralLocale {
  currency: {
    symbol: string;
  };
  delimiters: {
    thousands: string;
    decimal: string;
  };
  abbreviations: NumeralAbbreviations;
  ordinal(num: number): string;
}

export interface NumeralAbbreviations {
  thousand: string;
  million: string;
  billion: string;
  trillion: string;
}
