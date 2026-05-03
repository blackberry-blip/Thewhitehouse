import { useState, useCallback } from 'react';
import type { StudentRegistration } from '@/types';

const STORAGE_KEY = 'whitehouse_registrations';

export function useRegistrations() {
  const [registrations, setRegistrations] = useState<StudentRegistration[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addRegistration = useCallback((reg: StudentRegistration) => {
    setRegistrations((prev) => {
      const updated = [reg, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const verifyPayment = useCallback((id: string) => {
    setRegistrations((prev) => {
      const updated = prev.map((r) =>
        r.id === id ? { ...r, paymentStatus: 'verified' as const } : r
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

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
      r.selectedSubjects.join(', '),
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

  return { registrations, addRegistration, verifyPayment, exportToCSV };
}
