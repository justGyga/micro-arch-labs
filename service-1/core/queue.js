/* eslint-disable import/no-mutable-exports */
import { connect } from "amqplib";

/**
 * @type {import("amqplib").Channel}
 */
let queueChannel = null;
let _channelName = "";

/**
 *
 * @param {string} host
 * @param {string} login
 * @param {string} password
 * @param {number} port
 * @param {string} channelName
 */
export const runQueue = async (host, login, password, port, channelName) => {
  const connectionString = `amqp://${login}:${password}@${host}:${port}`;

  const connection = await connect(connectionString);
  const channel = await connection.createChannel();

  console.log("Connection to queue service is established");

  channel.assertQueue(channelName);
  _channelName = channelName;
  queueChannel = channel;
};

export function pushToQueue(message) {
  queueChannel.sendToQueue(_channelName, Buffer.from(message));
}
