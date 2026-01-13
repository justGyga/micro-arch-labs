export type InfoObject = {
    requestId: string;
    level: string;
    message: string;
};

const LEVELS = {
    error: "error",
    debug: "debug",
    warn: "warn",
    data: "data",
    info: "info",
    verbose: "verbose",
    silly: "silly",
    custom: "custom"
} as const satisfies Record<string, string>;

type LogPayload = Record<string, unknown> | string | null;

export type Logger = Record<(typeof LEVELS)[keyof typeof LEVELS], (data: LogPayload) => void>;

export type RequestIdLocals = { requestId: string };
