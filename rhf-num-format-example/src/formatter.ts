import BigNumber from "bignumber.js";

export interface IValidatorOverload {
  (v: string): boolean;
  (v: number): boolean;
  (v: object): boolean;
  (v: Array<any>): boolean;
  (v: any): boolean;
}
export const throwOverloadValueTypeNotFoundErr = (v: any) => {
  throw new Error(`There's no overload for the value type: ${v}`);
};

export const isString: IValidatorOverload = (v: any) =>
  typeof v === "string" ? true : false;

export const isNumber: IValidatorOverload = (v: any) => {
  switch (true) {
    case isString(v):
      return !/[\D]/g.test(v);
    case typeof v === "number":
      return true;
    default:
      return false;
  }
};

export const isFloat: IValidatorOverload = (v: any) => {
  switch (true) {
    case isString(v):
      return !/[\D.]/g.test(v);
    case typeof v === "number": // less overhead rather than calling `isNumber`
      return v === Math.trunc(v) ? false : true;
    default:
      return false;
  }
};

export const isPlainObject: IValidatorOverload = (v: any) =>
  !!v && v.constructor === Object;

export const isBigNumber: IValidatorOverload & { (v: BigNumber): boolean } = (
  v: any
) => (v instanceof BigNumber ? true : false);

export const hasPeriod = (v: string) => /\./g.test(v);

export const isArray = (v: any): boolean => {
  return Array.isArray(v);
};

export interface IAmtStr {
  (v: BigNumber, prefix?: string, suffix?: string): string;
  (
    v: BigNumber,
    prefix?: string,
    suffix?: string,
    format?: BigNumber.Format
  ): string;
  (v: string, prefix?: string, suffix?: string): string;
  (
    v: string,
    prefix?: string,
    suffix?: string,
    format?: BigNumber.Format
  ): string;
  (v: number, prefix?: string, suffix?: string): string;
  (
    v: string,
    prefix?: string,
    suffix?: string,
    format?: BigNumber.Format
  ): string;
}

export const amtStr: IAmtStr = (
  v: any = "0.00",
  prefix: string = "",
  suffix: string = "",
  format: BigNumber.Format = {
    prefix,
    decimalSeparator: ".",
    groupSeparator: ",",
    groupSize: 3,
    suffix,
  }
) => {
  if (!v) v = 0;
  let result: string = "";

  switch (true) {
    case isBigNumber(v):
      result = (<BigNumber>v).toFormat(2, format);
      break;
    case isString(v):
      (<string>v).replace(",", "");
      result = new BigNumber(<string>v || 0).toFormat(2, format);
      break;
    case isNumber(v):
      result = new BigNumber(<number>v || 0).toFormat(2, format);
      break;
    default:
      throwOverloadValueTypeNotFoundErr(v);
  }

  return result;
};

export const pcStr = (v: string) => amtStr(v, "", " %");

export interface IAmtFloat {
  (v: string): number;
  (v: number): number;
  (v: BigNumber): number;
}

export const amtFloat: IAmtFloat = (v: any = 0) => {
  if (!v) v = 0;
  let adj: any;

  switch (true) {
    case isString(v):
      adj = <string>v;
      break;
    case isNumber(v):
      adj = <number>v;
      break;
    case isBigNumber(v):
      adj = <BigNumber>v.toString();
      break;
    default:
      throwOverloadValueTypeNotFoundErr(v);
  }

  return parseFloat(parseFloat(adj).toFixed(2));
};

export interface INumberStr {
  (v: string): string;
  (v: number): string;
  (v: BigNumber): string;
}

// export const amtNumStr: INumberStr = (v: any = 0) => {
//   if (!v) v = 0;
//   //console.log('doggy', v);

//   let adj: string;
//   switch (true) {
//     case isString(v):
//       adj = (<string>v).replace(/( )|(- )|(--)|(,)/g, "");
//       break;
//     case isNumber(v):
//       adj = (<number>v).toFixed(2);
//       //console.log('doogie', adj);
//       break;
//     case isBigNumber(v):
//       adj = (<BigNumber>v).toFormat(2);
//       adj = (<string>adj).replace(/( )|(- )|(--)|(,)/g, "");
//       break;
//     default:
//       throwOverloadValueTypeNotFoundErr(v);
//     //console.log('muti', adj, typeof adj);
//   }
//   return adj;
// };
