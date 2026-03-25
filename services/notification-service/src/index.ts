import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { startConsumer } from "./consumer";
import { db } from "./db";
import { notifications } from "./db/schema";

const clients = new Set<any>();

const app = new Elysia()
  .use(swagger({
    documentation: {
      info: {
        title: "Notification Service API",
        version: "1.0.0",
        description: "Real-time API for notification management"
      },
      tags: [
        { name: "Notifications", description: "Notification Endpoint" },
        { name: "Health", description: "Health check" }
      ]
    }
  }))
  .ws("/ws", {
    open(ws) { clients.add(ws); },
    close(ws) { clients.delete(ws); },
    message(ws, message) { console.log("Received message:", message); }
  })
  .get("/api/notifications", async () => {
    return db.select().from(notifications);
  }, {
    detail: {
      summary: "Get all notifications",
      tags: ["Notifications"],
      responses: {
        200: { description: "List of notifications" }
      }
    }
  })
  .get("/health", () => ({ status: "ok", service: "notification-service" }), {
    detail: {
      summary: "Health check",
      tags: ["Health"],
      responses: {
        200: { description: "Service health status" }
      }
    }
  })
  .listen(3003);

startConsumer(clients).catch(console.error);
console.log(`Notification Service running on port ${app.server?.port}`);