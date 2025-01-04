import { Server } from "ws";

const wss = new Server({ port: 8000 });

wss.on("connection", (ws) => {
  console.log("Client connected.");

  ws.on("message", (message) => {
    console.log("Received:", message);
  });

  ws.send("close", () => {
    console.log("Client disconnected.");
  });
});

console.log("WebSocket server is running...");
