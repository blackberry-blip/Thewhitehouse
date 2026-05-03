import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Registration ID is required' });
    }

    const rows = await sql`
      DELETE FROM registrations
      WHERE id = ${id}
      RETURNING id
    `;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    return res.status(200).json({ id: rows[0].id, deleted: true });
  } catch (error) {
    console.error('Delete registration error:', error);
    return res.status(500).json({ error: 'Failed to delete registration', details: error.message });
  }
}
