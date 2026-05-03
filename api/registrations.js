import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  // GET — fetch all registrations (for admin dashboard)
  if (req.method === 'GET') {
    try {
      const rows = await sql`
        SELECT
          id,
          full_name,
          age,
          class,
          school_name,
          guardian_contact,
          selected_subjects,
          total_amount,
          payment_ref_number,
          payment_status,
          registration_date
        FROM registrations
        ORDER BY registration_date DESC
      `;

      // Map snake_case DB columns to camelCase for the frontend
      const registrations = rows.map((r) => ({
        id: r.id,
        fullName: r.full_name,
        age: r.age,
        class: r.class,
        schoolName: r.school_name,
        guardianContact: r.guardian_contact,
        selectedSubjects: r.selected_subjects || [],
        totalAmount: r.total_amount,
        paymentRefNumber: r.payment_ref_number,
        paymentStatus: r.payment_status,
        registrationDate: r.registration_date,
      }));

      return res.status(200).json(registrations);
    } catch (error) {
      console.error('GET registrations error:', error);
      return res.status(500).json({ error: 'Failed to fetch registrations', details: error.message });
    }
  }

  // POST — create a new registration (from student form)
  if (req.method === 'POST') {
    try {
      const {
        fullName,
        age,
        class: studentClass,
        schoolName,
        guardianContact,
        selectedSubjects,
        totalAmount,
        paymentRefNumber,
      } = req.body;

      // Basic validation
      if (!fullName || !age || !studentClass || !schoolName || !guardianContact || !paymentRefNumber) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Convert JS array to Postgres array literal string: {item1,item2}
      const subjectsArray = Array.isArray(selectedSubjects) && selectedSubjects.length > 0
        ? `{${selectedSubjects.map(s => `"${s}"`).join(',')}}`
        : '{}';

      const rows = await sql`
        INSERT INTO registrations (
          full_name, age, class, school_name, guardian_contact,
          selected_subjects, total_amount, payment_ref_number,
          payment_status, registration_date
        ) VALUES (
          ${fullName}, ${Number(age)}, ${Number(studentClass)}, ${schoolName},
          ${guardianContact}, ${subjectsArray}::text[], ${Number(totalAmount)},
          ${paymentRefNumber}, 'pending', NOW()
        )
        RETURNING
          id, full_name, age, class, school_name, guardian_contact,
          selected_subjects, total_amount, payment_ref_number,
          payment_status, registration_date
      `;

      const r = rows[0];
      const registration = {
        id: r.id,
        fullName: r.full_name,
        age: r.age,
        class: r.class,
        schoolName: r.school_name,
        guardianContact: r.guardian_contact,
        selectedSubjects: r.selected_subjects || [],
        totalAmount: r.total_amount,
        paymentRefNumber: r.payment_ref_number,
        paymentStatus: r.payment_status,
        registrationDate: r.registration_date,
      };

      return res.status(201).json(registration);
    } catch (error) {
      console.error('POST registration error:', error);
      return res.status(500).json({ error: 'Failed to create registration', details: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
