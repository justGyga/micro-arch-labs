// service-1/core/logger.js
import winston from "winston";
import { LogstashTcpTransport } from "./transport.js";

/** @type {import("winston").Logger} */
export let logger = null;

/**
 * Init logger
 * @param {string} logLevel
 * @param {string} serviceName
 * @param {string} host
 * @param {number} port
 */
export const runLogger = (logLevel, serviceName, host, port) => {
  const configLevels = {
    levels: {
      error: 0,
      debug: 1,
      warn: 2,
      data: 3,
      info: 4,
      verbose: 5,
      silly: 6,
      custom: 7,
    },
    colors: {
      error: "red",
      debug: "green",
      warn: "yellow",
      data: "grey",
      info: "white",
      verbose: "cyan",
      silly: "magenta",
      custom: "yellow",
    },
  };

  winston.addColors(configLevels.colors);

  const transports = [];

  transports.push(
    new winston.transports.Console({
      level: logLevel,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const extra =
            Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : "";
          return `${timestamp} [${serviceName}] ${level}: ${message}${extra}`;
        })
      ),
    })
  );

  transports.push(
    new LogstashTcpTransport({
      level: logLevel,
      host: host,
      port: port,
      service: serviceName,
    })
  );

  logger = winston.createLogger({
    level: logLevel,
    transports,
  });
};
