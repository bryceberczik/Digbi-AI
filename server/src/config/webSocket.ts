import { Server, WebSocket } from "ws";

export let activeClient: WebSocket | null = null;
const wss = new Server({ port: 8000 });

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected.");
  activeClient = ws;

  ws.on("close", () => {
    console.log("Client disconnected.");
    activeClient = null;
  });
});

console.log("WebSocket server is running...");
