export class ConfigError extends Error {
    constructor(readonly key: string) {
        super(`Env "${key}" not exists`);
        this.name = "ConfigError";
    }
}
