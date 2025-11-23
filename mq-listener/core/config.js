export class Config {
  static get(key, cb) {
    const value = process.env[key];
    if (!cb) return value;

    return cb(value);
  }

  static getWithDefault(key, defaultValue, cb) {
    const value = process.env[key] || defaultValue;
    if (!cb) return value;

    return cb(value);
  }

  static getOrThrow(key, cb) {
    const value = process.env[key];
    if (!value) throw Error(`Env "${key}" not exists`);

    if (!cb) return value;

    return cb(value);
  }
}
