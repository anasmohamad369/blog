const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL.");

    const queries = [
      `GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "public"."Blog" TO anon;`,
      `GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "public"."Blog" TO authenticated;`,
      `GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "public"."Blog" TO service_role;`,
      `NOTIFY pgrst, 'reload schema';`
    ];

    for (const q of queries) {
      console.log("Executing:", q);
      await client.query(q);
    }
    
    console.log("Permissions granted and cache reloaded successfully.");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

main();
