import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import { ZodError } from "zod";
import { prisma } from "./db.ts";
import { env } from "./env.ts";
import { Prisma } from "./generated/prisma/client.ts";
import { api } from "./routes.ts";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server, curl, mobile, or missing Origin headers
      if (!origin) return callback(null, true);
      const allowed = env.CORS_ORIGIN.split(",").map((o) => o.trim().toLowerCase());
      const lowerOrigin = origin.toLowerCase();
      if (
        allowed.includes(lowerOrigin) ||
        lowerOrigin === "https://asiftauhid.me" ||
        lowerOrigin === "https://www.asiftauhid.me" ||
        lowerOrigin.endsWith(".asiftauhid.me") ||
        lowerOrigin.includes("localhost") ||
        lowerOrigin.includes("127.0.0.1")
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", api);

app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// Central error handler: validation → 400, known Prisma errors → 404/409, else 500.
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      issues: err.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") return res.status(404).json({ error: "Record not found" });
    if (err.code === "P2002") return res.status(409).json({ error: "A record with that value already exists" });
    if (err.code === "P2003") return res.status(400).json({ error: "Related record does not exist" });
  }
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;

if (!process.env.VERCEL) {
  const server = app.listen(env.PORT, () => {
    console.log(`🚀 API ready on http://localhost:${env.PORT}`);
  });

  async function shutdown() {
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  }
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
