


import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;

// Create the PostgreSQL adapter (required for Prisma v7)
const adapter = new PrismaPg({
  connectionString,
});

// Prevent multiple Prisma instances during hot reload in dev
const globalForPrisma = globalThis;

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: adapter, // ⬅ REQUIRED for Prisma v7
    log: ["query"],   // optional
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
