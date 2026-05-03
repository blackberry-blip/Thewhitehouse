import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name TEXT NOT NULL,
        age INTEGER NOT NULL,
        class INTEGER NOT NULL,
        school_name TEXT NOT NULL,
        guardian_contact TEXT NOT NULL,
        selected_subjects TEXT[] DEFAULT '{}',
        total_amount INTEGER NOT NULL DEFAULT 0,
        payment_ref_number TEXT NOT NULL,
        payment_status TEXT NOT NULL DEFAULT 'pending',
        registration_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    return res.status(200).json({ message: 'Table created successfully' });
  } catch (error) {
    console.error('Setup error:', error);
    return res.status(500).json({ error: 'Failed to create table', details: error.message });
  }
}
