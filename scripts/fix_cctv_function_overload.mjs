import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: 'postgresql://postgres.clmamemnvttgdvebjnbw:7Li6eH2JQ8uZ9SyC@aws-0-sa-east-1.pooler.supabase.com:6543/postgres',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();
  console.log('Resolviendo sobrecarga en get_cctv_active_status...');
  await client.query('DROP FUNCTION IF EXISTS public.get_cctv_active_status(uuid);');
  console.log('Sobrecarga resuelta exitosamente.');
  await client.end();
}

main().catch(console.error);
