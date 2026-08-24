import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL
    }
  }
});

async function main() {
  console.log("Granting permissions to Supabase roles...");
  try {
    await prisma.$executeRawUnsafe(`GRANT ALL PRIVILEGES ON TABLE "public"."Blog" TO anon;`);
    await prisma.$executeRawUnsafe(`GRANT ALL PRIVILEGES ON TABLE "public"."Blog" TO authenticated;`);
    await prisma.$executeRawUnsafe(`GRANT ALL PRIVILEGES ON TABLE "public"."Blog" TO service_role;`);
    console.log("Permissions granted successfully.");

    console.log("Reloading PostgREST schema cache...");
    await prisma.$executeRawUnsafe(`NOTIFY pgrst, 'reload schema';`);
    console.log("Cache reloaded.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
