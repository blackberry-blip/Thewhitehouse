import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRegistrations } from '@/hooks/useRegistrations';
import type { StudentRegistration } from '@/types';
import { CheckCircle, Smartphone, CreditCard } from 'lucide-react';


export default function Registration() {
  const { addRegistration } = useRegistrations();
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [studentClass, setStudentClass] = useState<string>('');
  const [schoolName, setSchoolName] = useState('');
  const [guardianContact, setGuardianContact] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [paymentRef, setPaymentRef] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [enrollmentDetails, setEnrollmentDetails] =
    useState<StudentRegistration | null>(null);

  const totalAmount = selectedSubjects.length * 199;

  const handleClassChange = (val: string) => {
    setStudentClass(val);
    setSelectedSubjects([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !fullName ||
      !age ||
      !studentClass ||
      !schoolName ||
      !guardianContact ||
      !paymentRef
    )
      return;

    const registration: StudentRegistration = {
      id: crypto.randomUUID(),
      fullName,
      age: Number(age),
      class: Number(studentClass),
      schoolName,
      guardianContact,
      selectedSubjects,
      totalAmount,
      paymentRefNumber: paymentRef,
      paymentStatus: 'pending',
      registrationDate: new Date().toISOString(),
    };

    addRegistration(registration);
    setEnrollmentDetails(registration);
    setSubmitted(true);
  };

  if (submitted && enrollmentDetails) {
    return (
      <section id="register" className="py-20 bg-violet-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Registration Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for enrolling with The White House.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 text-left space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Student Name</span>
                  <span className="font-semibold text-gray-900">
                    {enrollmentDetails.fullName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Class</span>
                  <span className="font-semibold text-gray-900">
                    Class {enrollmentDetails.class}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">School</span>
                  <span className="font-semibold text-gray-900">
                    {enrollmentDetails.schoolName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Subjects</span>
                  <span className="font-semibold text-gray-900">
                    {enrollmentDetails.selectedSubjects.length > 0
                      ? enrollmentDetails.selectedSubjects.join(', ')
                      : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Paid</span>
                  <span className="font-bold text-violet-700">
                    Rs. {enrollmentDetails.totalAmount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Ref</span>
                  <span className="font-semibold text-gray-900">
                    {enrollmentDetails.paymentRefNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending Admin Verification
                  </span>
                </div>
              </div>

              <Button
                onClick={() => {
                  setSubmitted(false);
                  setEnrollmentDetails(null);
                  setFullName('');
                  setAge('');
                  setStudentClass('');
                  setSchoolName('');
                  setGuardianContact('');
                  setSelectedSubjects([]);
                  setPaymentRef('');
                }}
                className="bg-violet-600 hover:bg-violet-700"
              >
                Register Another Student
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="py-20 bg-violet-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Student Registration
          </h2>
          <p className="text-lg text-gray-600">
            Fill in your details, select your subjects, and complete payment via
            eSewa.
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age"
                    min={10}
                    max={20}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select
                    value={studentClass}
                    onValueChange={handleClassChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">Class 8</SelectItem>
                      <SelectItem value="10">Class 10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Enter school name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guardianContact">Guardian Contact Number</Label>
                <Input
                  id="guardianContact"
                  value={guardianContact}
                  onChange={(e) => setGuardianContact(e.target.value)}
                  placeholder="Enter contact number"
                  required
                />
              </div>

              {studentClass && (
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-violet-700">
                      Rs. {totalAmount}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-100">
                      <Smartphone className="w-5 h-5 text-violet-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          Pay via eSewa App
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          Send payment to{' '}
                          <span className="font-bold text-violet-700">
                            9701494422
                          </span>
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          Open your eSewa app → Send Money → Enter number
                          9701494422 → Amount Rs. {totalAmount}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentRef" className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-violet-600" />
                        eSewa Transaction Code / Reference Number
                      </Label>
                      <Input
                        id="paymentRef"
                        value={paymentRef}
                        onChange={(e) => setPaymentRef(e.target.value)}
                        placeholder="Enter transaction reference number"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        You will find this in your eSewa transaction history or
                        confirmation SMS.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={
                  !fullName ||
                  !age ||
                  !studentClass ||
                  !schoolName ||
                  !guardianContact ||
                  !paymentRef
                }
                className="w-full bg-violet-600 hover:bg-violet-700 text-lg py-6 rounded-xl font-semibold disabled:opacity-50"
              >
                Complete Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
