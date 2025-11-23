import express from "express";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);

app.use(express.json({ limit: "10mb" }));

app.get("", (req, res) => {
  console.log(`REQUEST IS HANDLED, QUERY ${JSON.stringify(req.query)}`);
  res.status(200).json(req.query);
});

server.listen(3001, () => console.log("APP BOOTSTRAPPED"));
