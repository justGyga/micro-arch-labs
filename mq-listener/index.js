import { Config } from "./core/config.js";
import { runQueue } from "./core/queue.js";

const mqHost = Config.getOrThrow("MQ_HOST", String);
const mqPort = Config.getWithDefault("MQ_PORT", 5672, Number);
const mqUser = Config.getOrThrow("MQ_USER", String);
const mqPassword = Config.getOrThrow("MQ_PASS", String);

const channelName = Config.getOrThrow("CHANNEL_NAME", String);

const listener = (msg) => console.log(JSON.parse(msg.content.toString()));

const bootstrap = async () => {
  await runQueue(mqHost, mqUser, mqPassword, mqPort, channelName, listener);
};

bootstrap();
