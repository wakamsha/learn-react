declare type XOR<T, U> = import('ts-xor').XOR<T, U>;

declare type ValueOf<T> = T[keyof T];

declare type Frozen<K extends keyof any, T> = Readonly<Record<K, T>>;
