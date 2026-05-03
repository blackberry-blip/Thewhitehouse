import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Registration ID is required' });
    }

    const rows = await sql`
      UPDATE registrations
      SET payment_status = 'verified'
      WHERE id = ${id}
      RETURNING id, payment_status
    `;

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    return res.status(200).json({
      id: rows[0].id,
      paymentStatus: rows[0].payment_status,
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return res.status(500).json({ error: 'Failed to verify payment' });
  }
}
