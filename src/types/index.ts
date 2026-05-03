export interface StudentRegistration {
  id: string;
  fullName: string;
  age: number;
  class: number;
  schoolName: string;
  guardianContact: string;
  selectedSubjects: string[];
  totalAmount: number;
  paymentRefNumber: string;
  paymentStatus: 'pending' | 'verified';
  registrationDate: string;
}
