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
import { CheckCircle, ArrowRight, ArrowLeft, CreditCard } from 'lucide-react';

const class8Subjects = ['English', 'Mathematics', 'Science', 'Social Studies'];
const class10Subjects = [
  'English', 'Mathematics', 'Science', 'Social Studies',
  'Optional Mathematics', 'Accountancy', 'Economics',
];

const REGISTRATION_FEE = 499;

// ─── Step indicator ───────────────────────────────────────────
function StepBar({ step }: { step: number }) {
  const steps = ['About You', 'Subjects', 'Payment'];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  done
                    ? 'bg-violet-600 text-white'
                    : active
                    ? 'bg-violet-600 text-white ring-4 ring-violet-100'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {done ? '✓' : idx}
              </div>
              <span className={`text-xs mt-1.5 font-medium transition-colors ${active ? 'text-violet-700' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 mb-4 mx-2 transition-all duration-500 ${step > idx ? 'bg-violet-600' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────
export default function Registration() {
  const { addRegistration } = useRegistrations();

  // Form state
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [schoolName, setSchoolName] = useState('');
  const [guardianContact, setGuardianContact] = useState('');
  const [paymentRef, setPaymentRef] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [enrollmentDetails, setEnrollmentDetails] = useState<StudentRegistration | null>(null);

  const subjectsForClass = studentClass === '8' ? class8Subjects : class10Subjects;

  const toggleSubject = (s: string) =>
    setSelectedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handleClassChange = (val: string) => {
    setStudentClass(val);
    setSelectedSubjects([]);
  };

  const handleSubmit = async () => {
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
    } else {
      setSubmitError('Registration failed. Please try again.');
    }
  };

  // ─── Success ───
  if (enrollmentDetails) {
    return (
      <section id="register" className="py-20 bg-white">
        <div className="max-w-lg mx-auto px-4">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">You're enrolled.</h2>
              <p className="text-gray-500 mb-6">
                Welcome, <span className="font-semibold text-gray-800">{enrollmentDetails.fullName}</span>. We'll verify your payment and send your class details within 24 hours.
              </p>

              <div className="bg-gray-50 rounded-xl p-5 text-left space-y-2.5 text-sm mb-6">
                {[
                  ['Class', `Class ${enrollmentDetails.class}`],
                  ['School', enrollmentDetails.schoolName],
                  ['Subjects', (enrollmentDetails.selectedSubjects || []).join(', ') || '—'],
                  ['Amount Paid', `Rs. ${enrollmentDetails.totalAmount}`],
                  ['Ref #', enrollmentDetails.paymentRefNumber],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-gray-400 shrink-0">{label}</span>
                    <span className="font-medium text-gray-800 text-right">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-400">Status</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full font-medium">Pending Verification</span>
                </div>
              </div>

              <p className="text-xs text-gray-400">
                From month 2: Rs. 199 per subject. You choose what to continue.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // ─── Form ───
  return (
    <section id="register" className="py-20 bg-white">
      <div className="max-w-lg mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 tracking-tight">
            Start Learning.
          </h2>
          <p className="text-gray-400 text-sm">Rs. 499 — first month, all subjects.</p>
        </div>

        <StepBar step={step} />

        <Card className="border border-gray-100 shadow-lg">
          <CardContent className="p-6 sm:p-8">

            {/* ── Step 1: About You ── */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h3 className="font-bold text-gray-800 text-lg mb-1">About the student</h3>

                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Student's full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Age"
                      min={10}
                      max={20}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="class">Class</Label>
                    <Select value={studentClass} onValueChange={handleClassChange}>
                      <SelectTrigger id="class">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">Class 8</SelectItem>
                        <SelectItem value="10">Class 10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  className="w-full bg-violet-600 hover:bg-violet-700 mt-2"
                  disabled={!fullName || !age || !studentClass}
                  onClick={() => setStep(2)}
                >
                  Next <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}

            {/* ── Step 2: Subjects + Contact ── */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h3 className="font-bold text-gray-800 text-lg mb-1">Subjects &amp; Details</h3>

                {/* Subject picker */}
                <div>
                  <Label className="mb-2 block">Select Subjects <span className="text-gray-400 font-normal text-xs">({selectedSubjects.length} selected)</span></Label>
                  <div className="grid grid-cols-2 gap-2">
                    {subjectsForClass.map((s) => {
                      const checked = selectedSubjects.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSubject(s)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium text-left transition-all duration-150 ${
                            checked
                              ? 'bg-violet-600 border-violet-600 text-white'
                              : 'bg-white border-gray-200 text-gray-700 hover:border-violet-300'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${checked ? 'bg-white border-white' : 'border-gray-300'}`}>
                            {checked && <span className="text-violet-600 text-xs font-bold">✓</span>}
                          </span>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Your school name"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="guardian">Guardian's Phone</Label>
                  <Input
                    id="guardian"
                    value={guardianContact}
                    onChange={(e) => setGuardianContact(e.target.value)}
                    placeholder="e.g. 9801234567"
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                  <Button
                    className="flex-1 bg-violet-600 hover:bg-violet-700"
                    disabled={selectedSubjects.length === 0 || !schoolName || !guardianContact}
                    onClick={() => setStep(3)}
                  >
                    Next <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ── Step 3: Payment ── */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h3 className="font-bold text-gray-800 text-lg mb-1">Payment — Rs. 499</h3>

                {/* What you get — short, bold, impactful */}
                <div className="bg-violet-600 rounded-2xl p-5 text-white">
                  <p className="text-xs font-semibold tracking-widest uppercase opacity-70 mb-3">Your Rs. 499 includes</p>
                  <div className="space-y-2">
                    {[
                      ['📚', 'All subjects for the full first month'],
                      ['🎥', 'Live interactive classes — every week'],
                      ['📝', 'Mock tests & practice papers'],
                      ['💡', 'Study resources & digital notes'],
                      ['🚀', 'Tech-powered lessons built for your child'],
                    ].map(([icon, text]) => (
                      <div key={text} className="flex items-center gap-3">
                        <span className="text-lg leading-none">{icon}</span>
                        <span className="text-sm font-semibold">{text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                    <span className="text-white/70 text-xs">Everything above, for just</span>
                    <span className="text-2xl font-black tracking-tight">Rs. 499</span>
                  </div>
                </div>

                <div className="flex flex-col items-center bg-gray-50 rounded-2xl p-5">
                  <img
                    src="/esewa-qr.png"
                    alt="eSewa QR"
                    className="w-52 h-52 object-contain bg-white rounded-xl border border-gray-200 p-2 shadow-sm"
                  />
                  <p className="text-sm text-green-700 font-medium mt-3">Scan with eSewa App</p>
                  <p className="text-xs text-gray-400 mt-1">or send to <span className="font-bold text-gray-700">9701494422</span> · Amount <span className="font-bold text-violet-700">Rs. 499</span></p>
                </div>

                {/* Ref input */}
                <div className="space-y-1.5">
                  <Label htmlFor="paymentRef" className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-violet-500" />
                    Transaction Reference Number
                  </Label>
                  <Input
                    id="paymentRef"
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                    placeholder="e.g. RC2025XXXXXX"
                  />
                  <p className="text-xs text-gray-400">eSewa app → Transaction History → your payment</p>
                </div>

                {submitError && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 text-center">
                    {submitError}
                  </p>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back
                  </Button>
                  <Button
                    className="flex-1 bg-violet-600 hover:bg-violet-700 font-bold"
                    disabled={!paymentRef || submitting}
                    onClick={handleSubmit}
                  >
                    {submitting ? 'Submitting...' : 'Complete Registration'}
                  </Button>
                </div>

                {/* Closing line */}
                <p className="text-center text-xs text-gray-400 pt-1">
                  The best investment you'll ever make is in a mind that never stops growing.
                </p>
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </section>
  );
}
