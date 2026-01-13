import { Socket } from "net";
import net from "node:net";
import Transport from "winston-transport";
import { InfoObject } from "./types";

export class LogstashTcpTransport extends Transport {
    private host: string;
    private port: number;
    private service: string;
    private socket: Socket | null;
    constructor(opts: { host: string; port: number; service: string; level: string }) {
        super(opts as any);
        this.host = opts.host;
        this.port = opts.port;
        this.service = opts.service;
        this.socket = null;
        this._connect();
    }

    _connect() {
        if (!this.host || !this.port) return;

        this.socket = net.createConnection({ host: this.host, port: this.port }, () => {});

        this.socket.on("error", (err) => {
            this.emit("error", err);
            this.socket.destroy();
            this.socket = null;

            setTimeout(() => this._connect(), 2000);
        });

        this.socket.on("close", () => {
            this.socket = null;
            setTimeout(() => this._connect(), 2000);
        });
    }

    log(info: InfoObject, callback: () => void) {
        setImmediate(() => this.emit("logged", info));

        if (this.socket && this.socket.writable) {
            const payload = {
                "@timestamp": new Date().toISOString(),
                requestId: info.requestId,
                level: info.level,
                message: info.message,
                service: this.service,
                ...info
            };

            try {
                this.socket.write(JSON.stringify(payload) + "\n");
            } catch (err) {
                this.emit("error", err);
            }
        }

        callback();
    }

    close() {
        if (this.socket) {
            this.socket.end();
            this.socket = null;
        }
    }
}
