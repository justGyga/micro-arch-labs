import Transport from "winston-transport";
import net from "node:net";

export class LogstashTcpTransport extends Transport {
  constructor(opts = {}) {
    super(opts);
    this.host = opts.host;
    this.port = opts.port;
    this.service = opts.service;
    this.socket = null;
    this._connect();
  }

  _connect() {
    if (!this.host || !this.port) return;

    this.socket = net.createConnection(
      { host: this.host, port: this.port },
      () => {}
    );

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

  log(info, callback) {
    setImmediate(() => this.emit("logged", info));

    if (this.socket && this.socket.writable) {
      const payload = {
        "@timestamp": new Date().toISOString(),
        requestId: info.requestId,
        level: info.level,
        message: info.message,
        service: this.service,
        ...info,
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
