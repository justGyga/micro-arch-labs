import { Config } from "./core/config";
import { TokenGuard } from "./core/guard";
import { runHttp } from "./core/http/index.js";
import { runLogger } from "./core/logger/index.js";
import { runQueue } from "./core/queue/index.js";
import { routes } from "./modules/index.js";

const appPort = Config.getWithDefault("APP_PORT", 3000, Number);

const mqHost = Config.getOrThrow("MQ_HOST", String);
const mqPort = Config.getWithDefault("MQ_PORT", 5672, Number);
const mqUser = Config.getOrThrow("MQ_USER", String);
const mqPassword = Config.getOrThrow("MQ_PASS", String);

const channelName = Config.getOrThrow("CHANNEL_NAME", String);

const logLevel = Config.getOrThrow("LOG_LEVEL", String);
const loggerHost = Config.getOrThrow("LOGGER_HOST", String);
const loggerPort = Config.getWithDefault("LOGGER_PORT", 3000, Number);
const serviceName = Config.getOrThrow("SERVICE_NAME", String);

const tokenSecret = Config.getOrThrow("TOKEN_SECRET_WORD", String);
const tokenTtl = Config.getWithDefault("TOKEN_TTL", "7d");

const bootstrap = async () => {
    runLogger(logLevel, serviceName, loggerHost, loggerPort);
    TokenGuard.init(tokenSecret, tokenTtl);
    await runQueue(mqHost, mqUser, mqPassword, mqPort, channelName);
    await runHttp(appPort, routes);
};

bootstrap();
