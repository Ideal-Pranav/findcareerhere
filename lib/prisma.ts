/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
// Use CommonJS require to avoid TypeScript type dependency on generated Prisma client
// This allows the project to build even if `prisma generate` has not been run yet.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client') as { PrismaClient: new (...args: any[]) => any }

const globalForPrisma = global as unknown as { prisma?: any }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
