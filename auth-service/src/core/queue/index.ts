import { Channel, connect } from "amqplib";

let queueChannel: Channel;
let _channelName = "";

export const runQueue = async (host: string, login: string, password: string, port: number, channelName: string) => {
    const connectionString = `amqp://${login}:${password}@${host}:${port}`;

    const connection = await connect(connectionString);
    const channel = await connection.createChannel();

    console.log("Connection to queue service is established");

    channel.assertQueue(channelName);
    _channelName = channelName;
    queueChannel = channel;
};

export function pushToQueue(message: Record<string, unknown>) {
    const payload = JSON.stringify(message);
    queueChannel.sendToQueue(_channelName, Buffer.from(payload));
}
