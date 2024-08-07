/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/consistent-type-imports */

declare module '*.gif' {
  const exports: any;
  export default exports;
}

declare module '*.jpg' {
  const exports: any;
  export default exports;
}

declare module '*.jpeg' {
  const exports: any;
  export default exports;
}

declare module '*.png' {
  const exports: any;
  export default exports;
}

declare module '*.woff' {
  const exports: any;
  export default exports;
}

declare module '*?url' {
  const content: string;
  export default content;
}

declare type XOR<T, U> = import('ts-xor').XOR<T, U>;

declare type ValueOf<T> = T[keyof T];

declare type Frozen<K extends keyof any, T> = Readonly<Record<K, T>>;
