import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.$executeRawUnsafe("NOTIFY pgrst, 'reload schema'").then(() => {
  console.log('reloaded');
  process.exit(0);
});
