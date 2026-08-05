const { Client } = require('pg');

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS public."Blog" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "excerpt" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "coverImage" TEXT NOT NULL,
  "bannerImage" TEXT NOT NULL DEFAULT '',
  "category" TEXT NOT NULL,
  "tags" TEXT NOT NULL DEFAULT '',
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

async function tryConnect(label, config) {
  const client = new Client(config);
  try {
    console.log(`Trying ${label}...`);
    await client.connect();
    console.log(`✅ Connected via ${label}!`);
    
    console.log('Creating Blog table...');
    await client.query(CREATE_TABLE_SQL);
    console.log('✅ Blog table created successfully!');
    
    const res = await client.query('SELECT COUNT(*) FROM public."Blog";');
    console.log(`Current row count: ${res.rows[0].count}`);
    
    await client.end();
    return true;
  } catch (err) {
    console.log(`❌ ${label} failed: ${err.message}`);
    try { await client.end(); } catch {}
    return false;
  }
}

async function main() {
  const password = '*5W?KJ4??2srN9H';
  const sslOpts = { rejectUnauthorized: false };

  // Attempt 1: Direct host
  let ok = await tryConnect('Direct (port 5432)', {
    host: 'db.yjgfbueleujzokfmdnfa.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password,
    ssl: sslOpts,
    connectionTimeoutMillis: 8000,
  });
  if (ok) return;

  // Attempt 2: Pooler ap-south-1 transaction mode (port 6543)
  ok = await tryConnect('Pooler ap-south-1 (port 6543)', {
    host: 'aws-0-ap-south-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.yjgfbueleujzokfmdnfa',
    password,
    ssl: sslOpts,
    connectionTimeoutMillis: 8000,
  });
  if (ok) return;

  // Attempt 3: Pooler ap-southeast-1 (Singapore)
  ok = await tryConnect('Pooler ap-southeast-1 (port 6543)', {
    host: 'aws-0-ap-southeast-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.yjgfbueleujzokfmdnfa',
    password,
    ssl: sslOpts,
    connectionTimeoutMillis: 8000,
  });
  if (ok) return;

  // Attempt 4: Pooler us-east-1
  ok = await tryConnect('Pooler us-east-1 (port 6543)', {
    host: 'aws-0-us-east-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.yjgfbueleujzokfmdnfa',
    password,
    ssl: sslOpts,
    connectionTimeoutMillis: 8000,
  });
  if (ok) return;

  // Attempt 5: Pooler eu-west-1
  ok = await tryConnect('Pooler eu-west-1 (port 6543)', {
    host: 'aws-0-eu-west-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.yjgfbueleujzokfmdnfa',
    password,
    ssl: sslOpts,
    connectionTimeoutMillis: 8000,
  });
  if (ok) return;

  // Attempt 6: Pooler us-west-1
  ok = await tryConnect('Pooler us-west-1 (port 6543)', {
    host: 'aws-0-us-west-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.yjgfbueleujzokfmdnfa',
    password,
    ssl: sslOpts,
    connectionTimeoutMillis: 8000,
  });
  if (ok) return;

  console.log('\n❌ All connection attempts failed.');
  console.log('Please go to Supabase Dashboard → Settings → Database → Connection Pooling');
  console.log('and share the "Connection string" shown there (URI format).');
}

main();
