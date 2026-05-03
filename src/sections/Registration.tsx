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
import { CheckCircle, CreditCard, Sparkles, BadgeCheck } from 'lucide-react';

const class8Subjects = ['English', 'Mathematics', 'Science', 'Social Studies'];
const class10Subjects = [
  'English',
  'Mathematics',
  'Science',
  'Social Studies',
  'Optional Mathematics',
  'Accountancy',
  'Economics',
];

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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [enrollmentDetails, setEnrollmentDetails] =
    useState<StudentRegistration | null>(null);

  // Fixed Rs. 499 registration fee (first month all-inclusive)
  const REGISTRATION_FEE = 499;

  const handleClassChange = (val: string) => {
    setStudentClass(val);
    setSelectedSubjects([]); // reset subjects when class changes
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !age || !studentClass || !schoolName || !guardianContact || !paymentRef)
      return;

    setSubmitting(true);
    setSubmitError(null);

    const saved = await addRegistration({
      fullName,
      age: Number(age),
      class: Number(studentClass),
      schoolName,
      guardianContact,
      selectedSubjects,
      totalAmount: REGISTRATION_FEE,
      paymentRefNumber: paymentRef,
    });

    setSubmitting(false);

    if (saved) {
      setEnrollmentDetails(saved);
      setSubmitted(true);
    } else {
      setSubmitError('Registration failed. Please try again or contact us.');
    }
  };

  // Success screen
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
                🎉 You're In! Registration Received.
              </h2>
              <p className="text-gray-600 mb-6">
                Welcome to The White House, {enrollmentDetails.fullName}! Our team will verify your payment and reach out within 24 hours with your class link.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 text-left space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Student</span>
                  <span className="font-semibold text-gray-900">{enrollmentDetails.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Class</span>
                  <span className="font-semibold text-gray-900">Class {enrollmentDetails.class}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">School</span>
                  <span className="font-semibold text-gray-900">{enrollmentDetails.schoolName}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">Selected Subjects</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(enrollmentDetails.selectedSubjects || []).length > 0
                      ? enrollmentDetails.selectedSubjects.map((s) => (
                          <span key={s} className="bg-violet-100 text-violet-700 text-xs font-medium px-2.5 py-1 rounded-full">{s}</span>
                        ))
                      : <span className="text-sm text-gray-500">None selected</span>
                    }
                  </div>
                </div>
                <div className="flex justify-between border-t pt-3 mt-2">
                  <span className="text-gray-500">Registration Fee Paid</span>
                  <span className="font-bold text-violet-700 text-lg">Rs. {enrollmentDetails.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Ref</span>
                  <span className="font-semibold text-gray-900">{enrollmentDetails.paymentRefNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending Admin Verification
                  </span>
                </div>
              </div>

              <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-700 mb-6">
                <p className="font-semibold mb-1">📌 What happens next?</p>
                <p>From month 2 onwards, you pay <strong>Rs. 199 per subject</strong> you want to continue. No pressure, pick what you need.</p>
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

  const subjectsForClass = studentClass === '8' ? class8Subjects : class10Subjects;

  return (
    <section id="register" className="py-20 bg-violet-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span className="text-yellow-700 text-sm font-semibold">Limited Seats Available</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Start Your Journey Today
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            One-time registration fee of <span className="font-bold text-violet-700">Rs. 499</span> covers your entire first month — all subjects, all classes, unlimited access.
          </p>
        </div>

        {/* Value cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: '🎓', title: 'First Month', desc: 'Rs. 499 — all subjects included' },
            { icon: '📚', title: 'Month 2 onwards', desc: 'Rs. 199 per subject you choose' },
            { icon: '💡', title: 'Tech-First Classes', desc: 'Interactive, live, digital tools' },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-bold text-gray-900 text-sm">{item.title}</div>
              <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
            </div>
          ))}
        </div>

        <Card className="border-0 shadow-xl">
          <CardContent className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Student details */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Student Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Student's full name"
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
                      placeholder="Age"
                      min={10}
                      max={20}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select value={studentClass} onValueChange={handleClassChange}>
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
                      placeholder="Your school name"
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="guardianContact">Guardian's Phone Number</Label>
                    <Input
                      id="guardianContact"
                      value={guardianContact}
                      onChange={(e) => setGuardianContact(e.target.value)}
                      placeholder="e.g. 9801234567"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Subject selection — only shown after class is picked */}
              {studentClass && (
                <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="w-5 h-5 text-violet-600" />
                      <span className="font-semibold text-violet-800">Select Your Subjects</span>
                    </div>
                    <span className="text-xs text-violet-500">{selectedSubjects.length} selected</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {subjectsForClass.map((s) => {
                      const checked = selectedSubjects.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSubject(s)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium text-left transition-all ${
                            checked
                              ? 'bg-violet-600 border-violet-600 text-white shadow-sm'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-violet-300 hover:bg-violet-50'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                            checked ? 'bg-white border-white' : 'border-gray-300'
                          }`}>
                            {checked && <span className="text-violet-600 text-xs font-bold">✓</span>}
                          </span>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-violet-500 mt-3">
                    ✅ All selected subjects are included in your Rs. 499 first month fee.
                  </p>
                </div>
              )}

              {/* Payment section */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4 text-lg">Payment — Rs. 499</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">

                  {/* QR code — large and centered for easy scanning */}
                  <div className="flex flex-col items-center mb-5">
                    <img
                      src="/esewa-qr.jpg"
                      alt="eSewa QR Code"
                      className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl border-2 border-green-200 object-contain bg-white p-3 shadow-md"
                    />
                    <p className="text-sm font-medium text-green-700 mt-2">📷 Scan with eSewa App</p>
                    <p className="text-xs text-gray-500 mt-1">OR send manually to <span className="font-bold text-gray-800">9701494422</span></p>
                  </div>

                  {/* Step instructions */}
                  <div className="bg-white border border-gray-100 rounded-xl p-4 mb-5">
                    <p className="font-semibold text-gray-900 mb-2 text-sm">How to pay:</p>
                    <ol className="text-sm text-gray-600 space-y-1.5 list-decimal list-inside">
                      <li>Open your <span className="font-semibold text-green-700">eSewa</span> app</li>
                      <li>Scan the QR above <span className="text-gray-400">OR</span> tap <em>Send Money</em> → <span className="font-bold text-gray-900">9701494422</span></li>
                      <li>Enter amount: <span className="font-bold text-violet-700">Rs. 499</span></li>
                      <li>Complete payment &amp; note the <span className="font-semibold">Transaction Reference</span></li>
                    </ol>
                  </div>

                  {/* Transaction ref input */}
                  <div className="space-y-2">
                    <Label htmlFor="paymentRef" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-violet-600" />
                      eSewa Transaction Reference Number
                    </Label>
                    <Input
                      id="paymentRef"
                      value={paymentRef}
                      onChange={(e) => setPaymentRef(e.target.value)}
                      placeholder="e.g. RC2025XXXXXX"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Found in eSewa app → Transaction History → Tap your payment
                    </p>
                  </div>
                </div>
              </div>

              {submitError && (
                <p className="text-sm text-red-600 text-center bg-red-50 border border-red-200 rounded-lg p-3">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                disabled={
                  submitting ||
                  !fullName ||
                  !age ||
                  !studentClass ||
                  !schoolName ||
                  !guardianContact ||
                  selectedSubjects.length === 0 ||
                  !paymentRef
                }
                className="w-full bg-violet-600 hover:bg-violet-700 text-lg py-6 rounded-xl font-bold disabled:opacity-50 transition-all"
              >
                {submitting ? 'Submitting...' : '🚀 Complete Registration — Rs. 499'}
              </Button>

              <p className="text-center text-xs text-gray-400">
                Your seat will be confirmed once our admin verifies the payment. Usually within a few hours.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
