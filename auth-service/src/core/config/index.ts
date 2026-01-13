import { ConfigError } from "./error";
import type { ConfigCallback, ConfigType, Key } from "./types";

export class Config {
    static get<T extends ConfigType>(key: Key, cb?: ConfigCallback<T>): T {
        const value = process.env[key];
        if (!cb) return value as T;

        return cb(value);
    }

    static getWithDefault<T extends ConfigType>(key: Key, defaultValue: T, cb?: ConfigCallback<T>): T {
        const value = process.env[key] || defaultValue;
        if (!cb) return value as T;

        return cb(value as any);
    }

    static getOrThrow<T extends ConfigType>(key: Key, cb?: ConfigCallback<T>): T {
        const value = process.env[key];
        if (!value) throw new ConfigError(key);

        if (!cb) return value as T;

        return cb(value);
    }
}
