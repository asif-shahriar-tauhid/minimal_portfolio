import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  PORT: z.coerce.number().default(5000),
  DATABASE_URL: z
    .string()
    .default(
      "postgres://ff20ddc91179f2ecb10b232e608bb7d628069a1f20667e6cbc319c72114664ea:sk_1mfZTJhI_sT70_Jh8l6Ua@pooled.db.prisma.io:5432/postgres?sslmode=require"
    ),
  JWT_SECRET: z
    .string()
    .default(
      "6a3dd9a72f3292b54c6d724d90815831702b5b01a5bf3398cbd2efa98f9d8547df318d184d1498db760c28b02c15dc4f"
    ),
  JWT_EXPIRES_IN: z.string().default("7d"),
  ADMIN_EMAIL: z.string().default("asifshahriartauhid@gmail.com"),
  ADMIN_PASSWORD: z.string().default("change-me-please"),
  /** Comma-separated list of allowed origins, e.g. http://localhost:3000 */
  CORS_ORIGIN: z.string().default("https://asiftauhid.me,https://www.asiftauhid.me,http://localhost:3000"),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.warn("⚠️ Warning: Environment variable validation issues (using fallbacks):");
  for (const issue of parsed.error.issues) {
    console.warn(`   • ${issue.path.join(".")}: ${issue.message}`);
  }
}

export const env = parsed.success
  ? parsed.data
  : {
      NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") || "production",
      PORT: Number(process.env.PORT) || 5000,
      DATABASE_URL:
        process.env.DATABASE_URL ||
        "postgres://ff20ddc91179f2ecb10b232e608bb7d628069a1f20667e6cbc319c72114664ea:sk_1mfZTJhI_sT70_Jh8l6Ua@pooled.db.prisma.io:5432/postgres?sslmode=require",
      JWT_SECRET:
        process.env.JWT_SECRET ||
        "6a3dd9a72f3292b54c6d724d90815831702b5b01a5bf3398cbd2efa98f9d8547df318d184d1498db760c28b02c15dc4f",
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || "asifshahriartauhid@gmail.com",
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "change-me-please",
      CORS_ORIGIN:
        process.env.CORS_ORIGIN ||
        "https://asiftauhid.me,https://www.asiftauhid.me,http://localhost:3000",
    };
