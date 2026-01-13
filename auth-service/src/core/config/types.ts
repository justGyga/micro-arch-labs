export type ConfigType = string | number | boolean;

export type Key = string;

export type ConfigCallback<T extends boolean | number | string> = (value: string) => T;
