import { useState, useCallback, useEffect } from 'react';
import type { StudentRegistration } from '@/types';

export function useRegistrations() {
  const [registrations, setRegistrations] = useState<StudentRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all registrations from the API
  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/registrations');
      if (!res.ok) {
        throw new Error('Failed to fetch registrations');
      }
      const data: StudentRegistration[] = await res.json();
      setRegistrations(data);
    } catch (err) {
      console.error('Fetch registrations error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load registrations on mount
  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  // Add a new registration via the API
  const addRegistration = useCallback(
    async (
      reg: Omit<StudentRegistration, 'id' | 'paymentStatus' | 'registrationDate'>
    ): Promise<StudentRegistration | null> => {
      setError(null);
      try {
        const res = await fetch('/api/registrations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reg),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Failed to submit registration');
        }
        const saved: StudentRegistration = await res.json();
        setRegistrations((prev) => [saved, ...prev]);
        return saved;
      } catch (err) {
        console.error('Add registration error:', err);
        setError(err instanceof Error ? err.message : 'Something went wrong');
        return null;
      }
    },
    []
  );

  // Verify a payment via the API
  const verifyPayment = useCallback(async (id: string) => {
    setError(null);
    try {
      const res = await fetch('/api/registrations/verify', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error('Failed to verify payment');
      }
      setRegistrations((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, paymentStatus: 'verified' as const } : r
        )
      );
    } catch (err) {
      console.error('Verify payment error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  }, []);

  // CSV export (client-side from loaded data)
  const exportToCSV = useCallback(() => {
    const headers = [
      'Name',
      'Age',
      'Class',
      'School',
      'Guardian Contact',
      'Selected Subjects',
      'Total Amount',
      'Payment Status',
      'Payment Ref',
      'Registration Date',
    ];
    const rows = registrations.map((r) => [
      r.fullName,
      r.age,
      r.class,
      r.schoolName,
      r.guardianContact,
      `"${(r.selectedSubjects || []).join(', ')}"`,
      r.totalAmount,
      r.paymentStatus,
      r.paymentRefNumber,
      r.registrationDate,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'whitehouse_registrations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [registrations]);

  return {
    registrations,
    loading,
    error,
    addRegistration,
    verifyPayment,
    exportToCSV,
    refetch: fetchRegistrations,
  };
}
