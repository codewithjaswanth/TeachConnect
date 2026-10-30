import { PrismaClient } from "@prisma/client";
import path from "node:path";
import fs from "node:fs";

function getDatabaseUrl(): string {
  // If an external database URL is provided (e.g. Postgres, Turso, Supabase)
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("file:")) {
    return process.env.DATABASE_URL;
  }

  // Running on Vercel or serverless read-only container
  if (process.env.VERCEL) {
    const tmpDb = path.join("/tmp", "dev.db");
    if (!fs.existsSync(tmpDb)) {
      const candidates = [
        path.join(process.cwd(), "prisma", "dev.db"),
        path.join(process.cwd(), "dev.db"),
        path.resolve("./prisma/dev.db"),
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          try {
            fs.copyFileSync(candidate, tmpDb);
            break;
          } catch (e) {
            console.error("Failed to copy database to /tmp:", e);
          }
        }
      }
    }
    return `file:${tmpDb}`;
  }

  // Local development: use absolute path to avoid cwd drift
  const localDb = path.resolve(process.cwd(), "prisma", "dev.db");
  return `file:${localDb}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const databaseUrl = getDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
