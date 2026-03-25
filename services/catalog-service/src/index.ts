import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { db } from "./db";
import { lenses } from "./db/schema";
import { eq } from "drizzle-orm";

const app = new Elysia()
  .use(cors())
  .use(swagger({
    documentation: {
      info: {
        title: "Catalog Service API",
        version: "1.0.0",
        description: "API for managing camera lens catalog"
      },
      tags: [
        { name: "Lenses", description: "Lens management endpoints" },
        { name: "Health", description: "Health check endpoints" }
      ]
    }
  }))
  .get("/api/lenses", async () => {
    return db.select().from(lenses);
  }, {
    detail: {
      summary: "Get all lenses",
      tags: ["Lenses"],
      responses: {
        200: {
          description: "List of lenses",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    modelName: { type: "string" },
                    manufacturerName: { type: "string" },
                    dayPrice: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  .get("/api/lenses/:id", async ({ params }) => {
    const results = await db
      .select()
      .from(lenses)
      .where(eq(lenses.id, params.id));
    if (!results[0]) {
      return new Response(JSON.stringify({ error: "Lens not found" }), {
        status: 404,
      });
    }
    return results[0];
  }, {
    detail: {
      summary: "Get lens by ID",
      tags: ["Lenses"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Lens ID"
        }
      ],
      responses: {
        200: {
          description: "Lens details",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  modelName: { type: "string" },
                  manufacturerName: { type: "string" },
                  dayPrice: { type: "string" }
                }
              }
            }
          }
        },
        404: {
          description: "Lens not found"
        }
      }
    }
  })
  .get("/health", () => ({ status: "ok", service: "catalog-service" }), {
    detail: {
      summary: "Health check",
      tags: ["Health"],
      responses: {
        200: {
          description: "Service health status"
        }
      }
    }
  })
  .listen(3001);

console.log(`Catalog Service running on port ${app.server?.port}`);
